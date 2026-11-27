# Build brief: Team 24904F "Trojan Horse" website

## Instructions for the agent
1. Read this brief and everything in `reference/`.
2. Produce an implementation plan: file structure, dependencies, phases, risks, open questions. **Write no code until I approve the plan.**
3. Build one phase at a time. After each phase, run lint and `next build`, show screenshots at 375, 768 and 1440 px, then stop for my review.
4. Never invent results, stats, quotes, match data or photos. If something is missing, ask.
5. Check current official docs before using any library API. Do not rely on memory.

## Goal
Rebuild my current single-file site in Next.js so it feels more professional and interactive, mainly through real data and restrained motion. It should also show my software work.

This is the personal website for VEX V5 team 24904F, Foothill High School, Bakersfield, CA.

## Source of truth
- `reference/index.html`: current site. The `SITE`, `SEASONS`, `TEAM`, `SPONSORS`, `TROPHIES`, `MEDIA` and `AWARDS` objects hold all content. Copy text exactly.
- `reference/images/`: the only photos and logos to use.

## Stack
- Next.js (App Router), JavaScript (`.js`/`.jsx`, no TypeScript), Tailwind CSS
- Hosted on Vercel, deployed from the GitHub repo. Use the standard Next.js build (no `output: 'export'`) and `next/image` for photos. Pre-render pages statically. No database or CMS.
- React Bits (reactbits.dev), free components only, JavaScript + Tailwind variants
- Anime.js v4
- Apache ECharts, modular imports from `echarts/core`
- All content in plain JavaScript files under `content/`, so adding a season means adding one object

## Routes
| Route | Content |
|---|---|
| `/` | Hero, seasons, competition photos, trophies, awards, how we build, about |
| `/seasons/[season]` | `26-27`, `25-26`, `24-25`: robot, specs, results, calendar, photo sliders |
| `/software` | Autonomous planner (coming later), CAD, robot code, PID & IMU, motor encoders & tracking wheels, PID chart |
| `/team` | Mission, students, coaches, RoboSaurus |
| `/awards` | Awards by season. The header photo is the trophy case; there is no separate Trophy Case section |
| `/media` | Header with `24904` and the horse above a row of the team logo and `@foothill_robotics`, then the gallery with full-screen viewer. A QR code will point here, so keep this path stable |
| `/sponsors` | Logos, how to sponsor, coach contacts |

Redirect old hash links on `/` (`#media`, `#season-2026-27`, etc.) to the new routes on the client.

## Design rules
- Match the current look: full-screen photo hero with content sliding over it, black, off-white and gold `#b2a371`, Big Shoulders Display headings, IBM Plex Sans body.
- Nav floats over the photo and turns solid on scroll. Seasons has a hover dropdown, plus a touch-friendly version.
- No borders or rounded corners on cards, photos, chips or panels. Square off the current rounded buttons too.
- No eyebrow labels, taglines, monospace tags or other generic or AI-sounding text. Replace existing monospace styling with the body font.
- Season labels use the `26-27` format. Write OVERRIDE in capitals where it labels the season menu.
- The home title does not show "24904F".
- Button label for sponsorship: `SPONSOR US`.
- No shadows or glows anywhere, including inside React Bits components. Header photos keep a flat dark overlay for contrast. Keyboard focus is a solid outline.
- The nav team logo is 57 px (30% larger than the original 44 px) on all screens, in proportion.
- Headings use the `Big Shoulders` family at optical size 72, which is its Display cut.
- Small gold text on light backgrounds uses `#756938` for contrast; `#b2a371` stays on dark backgrounds.
- Header photos use a darker flat overlay, and shorter headers add a flat full-width shade behind the title.
- Media header, number: `24904` in Rye (`next/font/google`, this page only) in gold, followed by `assets/photos/trojan-horse.png` standing in for the F, used as is. The horse matches the digit height and baseline, with digit-like spacing. Digits and horse are centred and scale as one unit, and screen readers read "24904F". It is as large as fits (24 px side margins).
- Media header, row: Instagram's glyph (`assets/photos/instagram-glyph.png`, original colours, unaltered, 0.9em, vertically centred) beside `@foothill_robotics` in lowercase, linked to https://www.instagram.com/foothill_robotics/, on one row at 375 px. The row keeps a 1.5em height. The nav keeps the team logo.
- Media header, spacing: three equal gaps (nav to number, number to logo row, logo row to the content panel).

## Media page: current season only
- The Media page shows only the current season's photos, plus the RoboSaurus section. This rule moves to the new season each year: when a season starts, the previous season's photos leave the Media page.
- A photo's season comes from its caption and the season entries in `content/`, not its file name (`pushback-robot.jpg` is "Our first Override design").
- **Approved exception:** `plaques-sign.jpg` stays in Trophies, because it shows all three awards (Design Award 26-27, Build Award 25-26, High Stakes Judges' Award 24-25). `trophy-design.jpg` and `trophy-judges.jpg` are not added.
- This changes only the Media page. Season pages, the home page and the Awards page keep their photos, and no image files are deleted. A category with no photos loses its heading.

## Home page trophies
The home page's Trophies are, newest first: Design Award (26-27, `trophy-design.jpg`), Build Award (25-26, `trophy-build.jpg`), Judges' Award (24-25, `trophy-judges.jpg`). Photos are shown whole, never cropped: equal cards (540 px tall at most), a little space around each photo on the section's background, no borders, shadows or hover zoom. Three across, or one per row at 640 px and narrower; never two and a leftover. `trophy-build.jpg` was added straight to `assets/photos/`.

## Sponsor logo loop
- The section heading is `THANK YOU TO OUR SPONSORS!`, centred above the logos (it replaces `Sponsors`).
- Loop logos are 67.2 px tall (20% larger than before) in a 133 px strip, never wider than the strip. Still-grid logos are also 20% larger where their tile allows; tiles do not change size.
- Logos slide continuously at one constant speed. No pause button, and no pause or slowdown on hover, focus, touch, click or scroll.
- Seamless at any screen width.
- Under `prefers-reduced-motion` (and without JavaScript), a still grid of all logos replaces the loop. Never show both.

## Push Back (25-26) media
Added from the updated `reference/index.html` 2025-26 entry, which is the source for the robot description, specs, order and captions. Originals are kept in `reference/images/` (not committed or built).

| File | Caption |
|---|---|
| `pb-state-1.jpg` | State robot |
| `pb-state-2.jpg` | State robot, top view |
| `pb-drivetrain.jpg` | League playoffs robot drivetrain |
| `pb-tournament-angle.jpg` | League playoffs robot |
| `pb-tournament-front.jpg` | League playoffs robot, front |
| `pb-bench-front.jpg` | League playoffs robot on the bench |

These are on the 25-26 page only; they are no longer on the Media page (see "Media page: current season only").

- `pb-state-2.jpg` is the 25-26 header photo and the image on the Push Back season card on the home page, both cropped around the same focal point. The header is a cover-style header with no empty bars, made taller than other season headers (the whole photo's height at full width, at most the screen height) so less is cropped, favouring the lower left (`30% 70%`). On phones it is at least 640 px tall (or the screen height), trimming the sides so the robot shows above the title.
- The 25-26 code is listed as "C++" (not "C++ on PROS"), and the description says "The code was written in C++." instead of saying the team moved to PROS that year (this differs from `reference/index.html`).
- The Photos section has two subsections: "State robot" (`pb-state-1.jpg`, `pb-state-2.jpg`) and "League playoffs robot" (drivetrain, tournament angle, tournament front, bench front, then the video).
- **Approved exception to the one-photo-per-page rule, this page only:** `pb-state-2.jpg` is both the header and in "State robot".
- The 26-27 robot has the spec row "First year using: Sensors, PID, CAD (Fusion 360 and Onshape), digital notebook" and the sentence "This is the first year the team has used sensors, PID, CAD tools (Fusion 360 and Onshape) and a digital notebook for better team collaboration."
- Software page cards: Autonomous Planner, CAD, Robot Code, "PID & IMU" and "Motor Encoders & Tracking Wheels". No tuning values or sensor models.
- The robot description's last sentence reads "The league playoffs robot is shown further down, under its own heading." (changed from "...further down the photos." in `reference/index.html`).
- Video: `public/video/pb-driver-view.mp4` (poster `pb-driver-view-poster.jpg`), below the photos on the 25-26 page only: controls, muted, playsinline, preload metadata, no autoplay. The Media gallery shows images only, so the video is not there.

## High Stakes (24-25) media
The 2024-25 entry in `reference/index.html` is the source for the robot description, specs, photo order and captions, copied exactly.

- Not on the Media page.
- `hs-playoff-1.jpg` is the 24-25 header (same cover style and height as other season headers, focal point `center 30%`) and the image on the High Stakes home card (centred). Because it is the header, it is not in the page's gallery.
- One "Photos" section without subsections: `hs-playoff-2.jpg` ("High Stakes playoff robot"), `hs-robotics-poster.jpg` ("Robotics poster").
- Then the videos in `public/video/`: `hs-match.mp4` with the visible caption "We are the red plate team at the top." (320 px wide at most), then `hs-playoff.mp4` (720 px at most, no caption).
- Both: controls, muted, playsinline, preload metadata, no autoplay, no poster image.

## Order of results and awards
Every season, including future ones, lists results and awards from the most recent at the top to the least recent at the bottom, on its season page and in its Awards page section. At the same event, the higher award comes first.

## Excluded photo
`gears.jpg` (the gear-train close-up, "Gear train detail") is removed from the whole site. Do not re-add it from `reference/`. The skip list in `scripts/prepare-photos.mjs` holds it, along with `pushback-build.jpg` (a repeat shot) and `media-qr.png` (the old QR code).

Media sections with a single photo (Design and build, Trophies) show it centred, 480 px wide at most.

## One photo per page
Each photo appears at most once per page, counting headers, cards, galleries, sliders and backgrounds. The full-screen viewer, the nav logo, the Media header logo and the loop's hidden copies do not count. When a header or card uses a shot, keep that placement. Do not delete image files or substitute other photos.

Same shot (keep the left one). The list lives in `content/sameShot.js`:

| Keep | Repeat |
|---|---|
| `bebop-back.jpg` | `build-bench.jpg` |
| `bebop-side.jpg` | `lift-bench.jpg` |
| `pit-work.jpg` | `pushback-build.jpg` |
| `stadium-bench.jpg` | `stadium-tall.jpg` |
| `plaques-sign.jpg` | `plaques-sign-2.jpg`, `trophy-design.jpg`, `trophy-judges.jpg` |

## Loading effect
- A moving shader (black, off-white, gold; no glow) covers each element that is still loading: photos, logos, headings, text blocks, cards, nav, and charts later (mark them `data-loading`).
- One shared WebGL canvas, never one per element.
- Each element reveals as soon as it is ready, with no added delay. Every effect clears within 2 seconds.
- Runs on first load, after navigation and for lazy photos. Content stays in the pre-rendered HTML and shows normally if JavaScript or WebGL fails.
- Still placeholder under `prefers-reduced-motion`. Release resources when done; no layout shift.

## Library roles (one job each)
| Library | Job |
|---|---|
| React Bits | Sponsor logo loop, media grid |
| Anime.js | Count-up stats, scroll reveals, season results timeline drawing on scroll, staggered results, one hero entrance |
| ECharts | Data charts with tooltips |

- Before adding a React Bits component, list its dependencies. Prefer ones that do not add a second animation library; ask me if one is unavoidable.
- No animated backgrounds, cursor effects, glitch text or tilt effects. The temporary loading effect below is the one exception.
- Honor `prefers-reduced-motion` in JavaScript and chart animations, not only CSS.
- Content must be readable if animations never run.
- Clean up Anime.js (`createScope()` and `revert()`) and ECharts instances on unmount. Resize charts with their container.
- Load ECharts only on pages that show a chart.
- Count-up and reveals use Anime.js because the React Bits versions add `motion` and `gsap`.
- Vendored React Bits files (`components/reactbits/**`) are excluded from lint; local changes are listed in their README.

## Charts
1. **PID response (Software page):** target vs. actual over time, with a before/after tuning toggle. Input: `content/data/pid-runs.csv` with columns `run,time_ms,target_deg,actual_deg`.
2. **Match scores (season page):** Input: `content/data/matches.csv` with columns `season,date,event,match,our_score,opponent_score`.

Build the CSV loaders and chart components, but hide each chart until its file has real data. Sample data is allowed only in tests and a development-only preview. Give each chart a short text summary for screen readers.

## Content rules
- Credit "Designed and built by Bryan Sobalvarro" on every page.
- The site may say it is student-built. It must not say the robotics program is run by students; coaches run it.
- Sponsor contacts are the two coaches' school emails only. Never add my personal email or phone.
- The sponsor name is "Wonderful Giving", not "The Wonderful Company".
- Show both Instagram accounts: @foothill_robotics and @roboticsatthehill.
- No contact page or contact form.
- `SPONSOR US` and recruitment links currently point to preview URLs. Put them in one config file so I can swap in live URLs.

## Quality bar
- Responsive with no horizontal page scroll at 375 px
- Keyboard accessible nav, dropdown, sliders and media viewer, with alt text on images
- Resize and compress photos at build time or before committing
- Lighthouse mobile targets: performance 85+, accessibility 95+
- Page titles, descriptions and social preview image
- Google Analytics 4 behind `NEXT_PUBLIC_GA_ID`, set in Vercel's environment variables (off when empty): page views, plus click events for sponsor, email and Instagram links

## Phases
| Phase | Work | Done when |
|---|---|---|
| 1 | Scaffold, content files, routes, visual match, hash redirects | All current content appears and the build passes |
| 2 | React Bits components | Reduced-motion and mobile checks pass |
| 3 | Anime.js motion | No leaked or repeated animations when navigating |
| 4 | ECharts and CSV loaders | Charts work with test data and stay hidden without real data |
| 5 | Accessibility, performance, SEO, analytics, README | Quality bar met; README explains editing content and deploying on Vercel |

## Out of scope
The autonomous planner, the Foothill Robotics recruitment page, the standalone sponsor page, and any second team's pages.
