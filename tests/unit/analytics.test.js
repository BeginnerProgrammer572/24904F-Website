import { describe, expect, it } from "vitest";
import { clickEvent } from "@/components/analytics/track";
import { config } from "@/content/config";

describe("clickEvent", () => {
  it("names sponsor, email and Instagram clicks", () => {
    expect(clickEvent(config.sponsorPage)).toEqual(["sponsor_click", {}]);
    expect(clickEvent("mailto:someone@example.org")).toEqual(["email_click", {}]);
    expect(clickEvent(config.instagram)).toEqual(["instagram_click", { account: "foothill_robotics" }]);
    expect(clickEvent(config.coachInstagram)).toEqual(["instagram_click", { account: "roboticsatthehill" }]);
  });

  it("ignores other links", () => {
    for (const href of [undefined, null, "/team", config.recruitPage]) expect(clickEvent(href)).toBeNull();
  });
});
