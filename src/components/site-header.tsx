"use client";

import { CompassOutlined, DownOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import BrandLogo from "@/components/brand-logo";
import { dayTours as fallbackDayTours, tourStyles as fallbackTourStyles } from "@/data/nav-tour-data";
import { honeymoonTrips } from "@/data/honeymoon-trips";

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dayTours, setDayTours] = useState(fallbackDayTours);
  const [tourStyles, setTourStyles] = useState(fallbackTourStyles);

  const closeMobile = () => setMobileOpen(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/tour-content", { cache: "no-store" });
        if (!res.ok) return;
        const data: { dayTours: typeof fallbackDayTours; tourStyles: typeof fallbackTourStyles } = await res.json();
        if (Array.isArray(data.dayTours) && data.dayTours.length > 0) setDayTours(data.dayTours);
        if (Array.isArray(data.tourStyles) && data.tourStyles.length > 0) setTourStyles(data.tourStyles);
      } catch {
        // Keep fallback data if API fails.
      }
    };
    void load();
  }, []);

  const dayToursItems: MenuProps["items"] = dayTours.map((item) => ({
    key: item.slug,
    label: (
      <Link href={`/day-tours/${item.slug}`} className="group block rounded-xl px-1 py-1">
        <p className="text-sm font-semibold text-slate-800 transition-colors duration-200 group-hover:text-emerald-800">
          {item.title}
        </p>
        <p className="mt-0.5 text-xs text-slate-500">{item.description}</p>
      </Link>
    ),
  }));

  const toursItems: MenuProps["items"] = tourStyles.map((item) => ({
    key: item.slug,
    label: (
      <Link href={`/tours/categories/${item.slug}`} className="group block rounded-xl px-1 py-1">
        <p className="text-sm font-semibold text-slate-800 transition-colors duration-200 group-hover:text-emerald-800">
          {item.title}
        </p>
        <p className="mt-0.5 text-xs text-slate-500">{item.description}</p>
      </Link>
    ),
  }));

  const honeymoonItems: MenuProps["items"] = honeymoonTrips.map((item) => ({
    key: item.slug,
    label: (
      <Link href={`/honeymoon-trips/${item.slug}`} className="group block rounded-xl px-1 py-1">
        <p className="text-sm font-semibold text-slate-800 transition-colors duration-200 group-hover:text-emerald-800">
          {item.title}
        </p>
        <p className="mt-0.5 text-xs text-slate-500">{item.description}</p>
      </Link>
    ),
  }));

  return (
    <header className="fixed inset-x-0 top-0 z-[1000] flex h-[var(--header-height)] items-center border-b border-slate-200/70 bg-[rgba(252,249,242,0.9)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 lg:px-8">
        <BrandLogo />
        <nav className="hidden items-center gap-2 text-sm font-medium lg:flex">
          <Dropdown
            menu={{ items: dayToursItems, className: "!rounded-2xl !p-2", style: { minWidth: 330 } }}
            trigger={["hover"]}
            classNames={{ root: "luxury-nav-dropdown" }}
          >
            <Button type="text" className="luxury-nav-trigger !h-10 !rounded-full !px-4 !text-[var(--foreground)]">
              <Space>
                <CompassOutlined />
                Day Tours
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>

          <Dropdown
            menu={{ items: toursItems, className: "!rounded-2xl !p-2", style: { minWidth: 330 } }}
            trigger={["hover"]}
            classNames={{ root: "luxury-nav-dropdown" }}
          >
            <Button type="text" className="luxury-nav-trigger !h-10 !rounded-full !px-4 !text-[var(--foreground)]">
              <Space>
                <CompassOutlined />
                Tours
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>

          <Dropdown
            menu={{ items: honeymoonItems, className: "!rounded-2xl !p-2", style: { minWidth: 330 } }}
            trigger={["hover"]}
            classNames={{ root: "luxury-nav-dropdown" }}
          >
            <Button type="text" className="luxury-nav-trigger !h-10 !rounded-full !px-4 !text-[var(--foreground)]">
              <Space>
                <CompassOutlined />
                Honeymoon Trips
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>

          <Link href="/destinations">
            <Button type="text" className="luxury-nav-trigger !h-10 !rounded-full !px-4 !text-[var(--foreground)]">
              Destinations
            </Button>
          </Link>
          <Link href="/about">
            <Button type="text" className="luxury-nav-trigger !h-10 !rounded-full !px-4 !text-[var(--foreground)]">
              About
            </Button>
          </Link>
          <Link href="/contact">
            <Button type="text" className="luxury-nav-trigger !h-10 !rounded-full !px-4 !text-[var(--foreground)]">
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
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Day Tours</p>
            <div className="flex flex-col gap-2">
              {dayTours.map((item) => (
                <Link
                  key={item.slug}
                  href={`/day-tours/${item.slug}`}
                  onClick={closeMobile}
                  className="rounded-xl border border-slate-100 bg-white px-3 py-2 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-emerald-100 hover:bg-emerald-50/40"
                >
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Tours</p>
            <div className="flex flex-col gap-2">
              {tourStyles.map((item) => (
                <Link
                  key={item.slug}
                  href={`/tours/categories/${item.slug}`}
                  onClick={closeMobile}
                  className="rounded-xl border border-slate-100 bg-white px-3 py-2 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-emerald-100 hover:bg-emerald-50/40"
                >
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Honeymoon Trips</p>
            <div className="flex flex-col gap-2">
              {honeymoonTrips.map((item) => (
                <Link
                  key={item.slug}
                  href={`/honeymoon-trips/${item.slug}`}
                  onClick={closeMobile}
                  className="rounded-xl border border-slate-100 bg-white px-3 py-2 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-emerald-100 hover:bg-emerald-50/40"
                >
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Link href="/destinations" onClick={closeMobile} className="rounded-lg px-3 py-2 hover:bg-slate-100">
              Destinations
            </Link>
            <Link href="/about" onClick={closeMobile} className="rounded-lg px-3 py-2 hover:bg-slate-100">
              About
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
