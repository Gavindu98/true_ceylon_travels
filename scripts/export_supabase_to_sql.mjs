#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const ENV_PATH = path.join(ROOT, ".env.local");
const SQL_OUT = path.join(ROOT, "supabase_export_all_data.sql");
const STORAGE_MANIFEST_OUT = path.join(ROOT, "supabase_storage_manifest.json");
const STORAGE_DIR = path.join(ROOT, "supabase_storage_export");

const DEFAULT_TABLES = [
  "tour_content_items",
  "tour_page_covers",
  "feedback",
  "contact",
  "tour_memories",
];

function parseEnv(raw) {
  const out = {};
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

function quoteIdent(identifier) {
  return `"${String(identifier).replaceAll('"', '""')}"`;
}

function sqlLiteral(value) {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "number") return Number.isFinite(value) ? String(value) : "NULL";
  if (typeof value === "boolean") return value ? "TRUE" : "FALSE";
  if (typeof value === "object") {
    const json = JSON.stringify(value).replaceAll("'", "''");
    return `'${json}'::jsonb`;
  }
  const str = String(value).replaceAll("'", "''");
  return `'${str}'`;
}

function buildInsert(tableName, rows) {
  if (!rows.length) return `-- ${tableName}: no rows\n`;
  const columns = Object.keys(rows[0]);
  const colSql = columns.map(quoteIdent).join(", ");
  const valuesSql = rows
    .map((row) => `(${columns.map((c) => sqlLiteral(row[c])).join(", ")})`)
    .join(",\n");
  return `insert into public.${quoteIdent(tableName)} (${colSql})\nvalues\n${valuesSql};\n`;
}

async function fetchJson(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed ${res.status} ${res.statusText}: ${text}`);
  }
  return res.json();
}

async function getAllRows({ supabaseUrl, serviceRoleKey, table }) {
  const all = [];
  const pageSize = 1000;
  let from = 0;

  while (true) {
    const to = from + pageSize - 1;
    const url = `${supabaseUrl}/rest/v1/${table}?select=*`;
    const res = await fetch(url, {
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        Prefer: "count=exact",
        Range: `${from}-${to}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed fetching table "${table}" (${res.status}): ${text}`);
    }

    const rows = await res.json();
    all.push(...rows);
    if (rows.length < pageSize) break;
    from += pageSize;
  }

  return all;
}

async function getBuckets({ supabaseUrl, serviceRoleKey }) {
  return fetchJson(`${supabaseUrl}/storage/v1/bucket`, {
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
    },
  });
}

async function listBucketObjects({ supabaseUrl, serviceRoleKey, bucket }) {
  const all = [];
  const limit = 1000;
  let offset = 0;

  while (true) {
    const data = await fetchJson(`${supabaseUrl}/storage/v1/object/list/${bucket}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
      },
      body: JSON.stringify({
        prefix: "",
        limit,
        offset,
        sortBy: { column: "name", order: "asc" },
      }),
    });

    all.push(...data);
    if (data.length < limit) break;
    offset += limit;
  }

  return all;
}

async function downloadStorageObject({
  supabaseUrl,
  serviceRoleKey,
  bucket,
  objectName,
  targetPath,
}) {
  const url = `${supabaseUrl}/storage/v1/object/authenticated/${bucket}/${encodeURI(objectName)}`;
  const res = await fetch(url, {
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `Failed download ${bucket}/${objectName} (${res.status}): ${text.slice(0, 300)}`
    );
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.mkdir(path.dirname(targetPath), { recursive: true });
  await fs.writeFile(targetPath, buf);
}

async function main() {
  const downloadStorage = process.argv.includes("--download-storage");
  const envRaw = await fs.readFile(ENV_PATH, "utf8");
  const env = parseEnv(envRaw);

  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;
  const tables =
    env.SUPABASE_EXPORT_TABLES?.split(",").map((t) => t.trim()).filter(Boolean) ??
    DEFAULT_TABLES;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local"
    );
  }

  const chunks = [
    "-- Auto-generated export SQL from current Supabase project",
    "-- Generated by scripts/export_supabase_to_sql.mjs",
    "",
    "begin;",
    "",
  ];

  for (const table of tables) {
    try {
      const rows = await getAllRows({ supabaseUrl, serviceRoleKey, table });
      chunks.push(`-- ${table} (${rows.length} rows)`);
      chunks.push(buildInsert(table, rows));
    } catch (err) {
      const message = String(err?.message || err);
      if (message.includes("(404)")) {
        chunks.push(`-- ${table}: skipped (table not found in current project)`);
        chunks.push("");
        continue;
      }
      throw err;
    }
  }

  chunks.push("commit;");
  chunks.push("");
  await fs.writeFile(SQL_OUT, chunks.join("\n"), "utf8");

  const buckets = await getBuckets({ supabaseUrl, serviceRoleKey });
  const manifest = [];

  for (const bucket of buckets) {
    const objects = await listBucketObjects({
      supabaseUrl,
      serviceRoleKey,
      bucket: bucket.name,
    });

    const files = objects.filter((o) => Boolean(o.id) && !o.name.endsWith("/"));
    const normalizedObjects = files.map((o) => ({
      name: o.name,
      metadata: o.metadata ?? null,
      created_at: o.created_at ?? null,
      updated_at: o.updated_at ?? null,
      last_accessed_at: o.last_accessed_at ?? null,
    }));

    manifest.push({
      bucket: bucket.name,
      public: bucket.public,
      file_count: normalizedObjects.length,
      objects: normalizedObjects,
    });

    if (downloadStorage) {
      for (const object of normalizedObjects) {
        const targetPath = path.join(STORAGE_DIR, bucket.name, object.name);
        await downloadStorageObject({
          supabaseUrl,
          serviceRoleKey,
          bucket: bucket.name,
          objectName: object.name,
          targetPath,
        });
      }
    }
  }

  await fs.writeFile(STORAGE_MANIFEST_OUT, JSON.stringify(manifest, null, 2), "utf8");

  console.log(`Done.
- SQL dump: ${path.relative(ROOT, SQL_OUT)}
- Storage manifest: ${path.relative(ROOT, STORAGE_MANIFEST_OUT)}
${downloadStorage ? `- Storage files: ${path.relative(ROOT, STORAGE_DIR)}` : "- Storage files: skipped (use --download-storage)"}`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
