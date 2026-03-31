"use client";

import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import Link from "next/link";

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
  return (
    <header className="sticky top-0 z-50 bg-[rgba(252,249,242,0.85)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="text-lg font-bold tracking-tight text-[var(--color-primary)]">
          True Ceylon Travels
        </Link>
        <nav className="hidden items-center gap-3 text-sm font-medium md:flex">
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
      </div>
    </header>
  );
}
