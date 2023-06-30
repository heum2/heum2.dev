"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { pageview } from "libs/gtags";
import { config } from "config";

// route가 변경될 때 gtag에서
export const useGtag = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + searchParams.toString();

    if (config.googleAnalytics.enable) {
      pageview(url);
    }
  }, [pathname, searchParams]);
};
