# Build brief: Team 24904F "Trojan Horse" website

## Instructions for the agent
1. Read this brief and everything in `reference/`.
2. Produce an implementation plan: file structure, dependencies, phases, risks, open questions. **Write no code until I approve the plan.**
3. Build one phase at a time. After each phase, run lint, type check and `next build`, show screenshots at 375, 768 and 1440 px, then stop for my review.
4. Never invent results, stats, quotes, match data or photos. If something is missing, ask.
5. Check current official docs before using any library API. Do not rely on memory.

## Goal
Rebuild my current single-file site in Next.js so it feels more professional and interactive, mainly through real data and restrained motion. It should also show my software work.

This is the personal website for VEX V5 team 24904F, Foothill High School, Bakersfield, CA.

## Source of truth
- `reference/index.html`: current site. The `SITE`, `SEASONS`, `TEAM`, `SPONSORS`, `TROPHIES`, `MEDIA` and `AWARDS` objects hold all content. Copy text exactly.
- `reference/images/`: the only photos and logos to use.

## Stack
- Next.js (App Router), TypeScript, Tailwind CSS
- Static export (`output: 'export'`), with `images.unoptimized: true` or a custom image loader. No server features, database or CMS. Keep it host-independent.
- React Bits (reactbits.dev), free components only, TypeScript + Tailwind variants
- Anime.js v4
- Apache ECharts, modular imports from `echarts/core`
- All content in typed files under `content/`, so adding a season means adding one object

## Routes
| Route | Content |
|---|---|
| `/` | Hero, seasons, competition photos, trophies, awards, how we build, about |
| `/seasons/[season]` | `26-27`, `25-26`, `24-25`: robot, specs, results, calendar, photo sliders |
| `/software` | Autonomous planner (coming later), CAD, robot code, PID/tracking wheels/encoders, PID chart |
| `/team` | Mission, students, coaches, RoboSaurus |
| `/awards` | Trophy case and awards by season |
| `/media` | Gallery with full-screen viewer. A QR code will point here, so keep this path stable |
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

## Library roles (one job each)
| Library | Job |
|---|---|
| React Bits | Count-up stats, scroll reveals, sponsor logo loop, media grid |
| Anime.js | Season results timeline drawing on scroll, staggered results, one hero entrance |
| ECharts | Data charts with tooltips |

- Before adding a React Bits component, list its dependencies. Prefer ones that do not add a second animation library; ask me if one is unavoidable.
- No animated backgrounds, cursor effects, glitch text or tilt effects.
- Honor `prefers-reduced-motion` in JavaScript and chart animations, not only CSS.
- Content must be readable if animations never run.
- Clean up Anime.js (`createScope()` and `revert()`) and ECharts instances on unmount. Resize charts with their container.
- Load ECharts only on pages that show a chart.

## Charts
1. **PID response (Software page):** target vs. actual over time, with a before/after tuning toggle. Input: `content/data/pid-runs.csv` with columns `run,time_ms,target_deg,actual_deg`.
2. **Match scores (season page):** Input: `content/data/matches.csv` with columns `season,date,event,match,our_score,opponent_score`.

Build the CSV loaders and chart components, but hide each chart until its file has real data. Sample data is allowed in tests only. Give each chart a short text summary for screen readers.

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
- Google Analytics 4 behind `NEXT_PUBLIC_GA_ID` (off when empty): page views, plus click events for sponsor, email and Instagram links

## Phases
| Phase | Work | Done when |
|---|---|---|
| 1 | Scaffold, content files, routes, visual match, hash redirects | All current content appears and static build passes |
| 2 | React Bits components | Reduced-motion and mobile checks pass |
| 3 | Anime.js motion | No leaked or repeated animations when navigating |
| 4 | ECharts and CSV loaders | Charts work with test data and stay hidden without real data |
| 5 | Accessibility, performance, SEO, analytics, README | Quality bar met; README explains editing content and deploying |

## Out of scope
The autonomous planner, the Foothill Robotics recruitment page, the standalone sponsor page, and any second team's pages.
