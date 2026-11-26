import { describe, expect, it } from "vitest";
import { home } from "@/content/home";
import { media, robosaurus, trophies } from "@/content/media";
import { pages } from "@/content/pages";
import { photos as p } from "@/content/photos";
import { sameShot } from "@/content/sameShot";
import { seasons } from "@/content/seasons";
import { sponsors } from "@/content/sponsors";

// Every photo each route shows, mirroring what the page files render. The nav
// logo, the Media header logo and the photo viewer are exempt.
const routes = {
  "/": [
    home.hero.photo,
    ...seasons.map((s) => s.photo),
    ...[...home.competition, ...trophies, ...home.build].map((i) => i.src),
  ],
  ...Object.fromEntries(
    seasons.map((s) => [
      `/seasons/${s.id}`,
      [s.header ?? s.photo, ...[...(s.galleries ?? []), ...s.sliders].flatMap((x) => x.items).map((i) => i.src)],
    ]),
  ),
  "/software": [pages.software.hero.photo],
  "/team": [pages.team.hero.photo, ...robosaurus.map((i) => i.src)],
  "/awards": [pages.awards.hero.photo],
  "/media": media.flatMap((s) => s.items).map((i) => i.src),
  "/sponsors": [pages.sponsors.hero.photo, ...sponsors.map((s) => s.logo)],
};

describe.each(Object.entries(routes))("%s", (route, list) => {
  // One approved exception: on 25-26, pb-state-2 is the header and in the gallery.
  const shown = list.filter(Boolean).filter((src, i, all) => !(route === "/seasons/25-26" && src === p.pbState2 && all.indexOf(src) !== i));

  it("shows no photo twice", () => {
    expect(shown).toEqual([...new Set(shown)]);
  });

  it("shows no two files of the same shot", () => {
    const repeats = sameShot.filter(([keep, other]) => shown.includes(keep) && shown.includes(other));
    expect(repeats).toEqual([]);
  });
});
