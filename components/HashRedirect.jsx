"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { routeForHash } from "@/lib/hashRoutes";

export default function HashRedirect() {
  const router = useRouter();
  useEffect(() => {
    const go = () => {
      const route = routeForHash(window.location.hash);
      if (route) router.replace(route);
    };
    go();
    window.addEventListener("hashchange", go);
    return () => window.removeEventListener("hashchange", go);
  }, [router]);
  return null;
}
