"use client";

import { GoogleAnalytics, sendGAEvent } from "@next/third-parties/google";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    sendGAEvent("config", GA_MEASUREMENT_ID, { page_path: pagePath });
  }, [pathname, searchParams]);

  return null;
}

export default function GoogleAnalyticsProvider() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </>
  );
}
