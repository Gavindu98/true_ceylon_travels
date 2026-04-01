"use client";

import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import Link from "next/link";
import { useState } from "react";

const toursItems: MenuProps["items"] = [
  { key: "all", label: <Link href="/tours">All Tours</Link> },
  { key: "day", label: <Link href="/tours#day-tours">Day Tours</Link> },
  { key: "multi", label: <Link href="/tours#multi-day">Multi-day Tours</Link> },
];

const customToursItems: MenuProps["items"] = [
  { key: "planner", label: <Link href="/custom-tours">Custom Tour Planner</Link> },
  { key: "private", label: <Link href="/custom-tours#private">Private Tours</Link> },
  { key: "group", label: <Link href="/custom-tours#group">Group Tours</Link> },
];

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-[rgba(252,249,242,0.85)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="text-lg font-bold tracking-tight text-[var(--color-primary)]">
          True Ceylon Travels
        </Link>
        <nav className="hidden items-center gap-3 text-sm font-medium lg:flex">
          <Dropdown menu={{ items: toursItems }} trigger={["hover"]}>
            <Button type="text" className="!text-[var(--foreground)] hover:!text-[var(--color-primary)]">
              <Space>
                Tours
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>

          <Dropdown menu={{ items: customToursItems }} trigger={["hover"]}>
            <Button type="text" className="!text-[var(--foreground)] hover:!text-[var(--color-primary)]">
              <Space>
                Custom Tours
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>

          <Link href="/destinations">
            <Button type="text" className="!text-[var(--foreground)] hover:!text-[var(--color-primary)]">
              Destinations
            </Button>
          </Link>
          <Link href="/contact">
            <Button type="text" className="!text-[var(--foreground)] hover:!text-[var(--color-primary)]">
              Contact
            </Button>
          </Link>
          <Link href="/contact">
            <Button type="primary" className="!uppercase !tracking-[0.05em]">
              Book Now
            </Button>
          </Link>
        </nav>

        <Button
          type="text"
          icon={<MenuOutlined />}
          aria-label="Open navigation menu"
          className="!text-[var(--foreground)] lg:!hidden"
          onClick={() => setMobileOpen(true)}
        />
      </div>

      <Drawer
        title="Menu"
        placement="right"
        open={mobileOpen}
        onClose={closeMobile}
        size="default"
      >
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Tours</p>
            <div className="flex flex-col gap-2">
              <Link href="/tours" onClick={closeMobile} className="rounded-lg px-3 py-2 hover:bg-slate-100">
                All Tours
              </Link>
              <Link href="/tours#day-tours" onClick={closeMobile} className="rounded-lg px-3 py-2 hover:bg-slate-100">
                Day Tours
              </Link>
              <Link href="/tours#multi-day" onClick={closeMobile} className="rounded-lg px-3 py-2 hover:bg-slate-100">
                Multi-day Tours
              </Link>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Custom Tours</p>
            <div className="flex flex-col gap-2">
              <Link href="/custom-tours" onClick={closeMobile} className="rounded-lg px-3 py-2 hover:bg-slate-100">
                Custom Tour Planner
              </Link>
              <Link href="/custom-tours#private" onClick={closeMobile} className="rounded-lg px-3 py-2 hover:bg-slate-100">
                Private Tours
              </Link>
              <Link href="/custom-tours#group" onClick={closeMobile} className="rounded-lg px-3 py-2 hover:bg-slate-100">
                Group Tours
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Link href="/destinations" onClick={closeMobile} className="rounded-lg px-3 py-2 hover:bg-slate-100">
              Destinations
            </Link>
            <Link href="/contact" onClick={closeMobile} className="rounded-lg px-3 py-2 hover:bg-slate-100">
              Contact
            </Link>
          </div>

          <Link href="/contact" onClick={closeMobile}>
            <Button type="primary" className="!w-full !uppercase !tracking-[0.05em]">
              Book Now
            </Button>
          </Link>
        </div>
      </Drawer>
    </header>
  );
}
