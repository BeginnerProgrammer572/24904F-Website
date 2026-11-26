import { siteUrl } from "@/content/config";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/dev/" },
    sitemap: new URL("/sitemap.xml", siteUrl).href,
  };
}
