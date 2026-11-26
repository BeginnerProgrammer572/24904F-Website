import { siteUrl } from "@/content/config";
import { seasonHref, seasons } from "@/content/seasons";

export default function sitemap() {
  const routes = ["/", ...seasons.map(seasonHref), "/software", "/team", "/awards", "/media", "/sponsors"];
  return routes.map((route) => ({ url: new URL(route, siteUrl).href }));
}
