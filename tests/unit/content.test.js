import { describe, expect, it } from "vitest";
import { media } from "@/content/media";
import { allAwards, seasons } from "@/content/seasons";
import { team } from "@/content/team";
import { routeForHash } from "@/lib/hashRoutes";

describe("routeForHash", () => {
  it.each([
    ["#media", "/media"],
    ["#software", "/software"],
    ["#team", "/team"],
    ["#awards", "/awards"],
    ["#sponsors", "/sponsors"],
    ["#seasons", "/seasons/26-27"],
    ["#season-2026-27", "/seasons/26-27"],
    ["#season-2025-26", "/seasons/25-26"],
    ["#season-2024-25", "/seasons/24-25"],
    ["#season-1999-00", "/seasons/26-27"],
  ])("maps %s to %s", (hash, route) => {
    expect(routeForHash(hash)).toBe(route);
  });

  it("stays on the home page for other hashes", () => {
    for (const hash of ["", "#home", "#content", "#nope"]) expect(routeForHash(hash)).toBeNull();
  });
});

describe("content", () => {
  it("has complete season objects", () => {
    for (const s of seasons) {
      expect(s.id).toMatch(/^\d\d-\d\d$/);
      expect(s.game && s.blurb && s.robot.desc).toBeTruthy();
      expect(s.results.length).toBeGreaterThan(0);
      for (const e of s.events) expect(Number.isNaN(Date.parse(e.date))).toBe(false);
    }
  });

  it("keeps the five awards in the old order", () => {
    expect(allAwards.map((a) => a.season)).toEqual(["26-27", "25-26", "25-26", "25-26", "24-25"]);
  });

  it("gives every photo a source and alt text", () => {
    const items = [...media, ...seasons.flatMap((s) => s.sliders)].flatMap((g) => g.items);
    for (const item of items) expect(item.src && item.alt).toBeTruthy();
  });

  it("lists only the coaches' school emails", () => {
    expect(team.coaches.map((c) => c.email)).toEqual(["sergio_garcia@kernhigh.org", "shannon_flowers@kernhigh.org"]);
  });
});
