import { revalidatePath } from "next/cache";

export function revalidateTravelPackagePages() {
  revalidatePath("/");
}

export const noStoreHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate",
};
