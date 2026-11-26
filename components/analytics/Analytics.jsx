"use client";

import { GoogleAnalytics, sendGAEvent } from "@next/third-parties/google";
import { useEffect } from "react";
import { clickEvent } from "./track";

const ID = process.env.NEXT_PUBLIC_GA_ID;

// Google Analytics 4, off unless NEXT_PUBLIC_GA_ID is set. Page views, including
// in-site navigation, come from GA's "page changes based on browser history".
export default function Analytics() {
  useEffect(() => {
    if (!ID) return undefined;
    const onClick = (e) => {
      const event = clickEvent(e.target.closest?.("a[href]")?.getAttribute("href"));
      if (event) sendGAEvent("event", ...event);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return ID ? <GoogleAnalytics gaId={ID} /> : null;
}
