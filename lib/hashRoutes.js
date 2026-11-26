import { latestSeason, seasonHref, seasons } from "@/content/seasons";

const PAGES = ["software", "team", "awards", "media", "sponsors"];

// Maps links from the old single-file site (#media, #season-2026-27) to routes.
export function routeForHash(hash) {
  const key = hash.replace(/^#/, "");
  if (PAGES.includes(key)) return `/${key}`;
  if (key === "seasons") return seasonHref(latestSeason);
  if (key.startsWith("season-")) {
    const id = key.slice("season-".length).replace(/^20/, "");
    return seasonHref(seasons.find((s) => s.id === id) ?? latestSeason);
  }
  return null;
}
