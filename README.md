# Team 24904F "Trojan Horse" website

The website for VEX V5 team 24904F, Foothill High School, Bakersfield, CA.
Next.js (App Router, JavaScript), Tailwind CSS, Anime.js and ECharts, hosted on Vercel.
Designed and built by Bryan Sobalvarro. `docs/BRIEF.md` holds the design rules.

## Run it

Needs Node 20.9 or newer.

```
npm install
npm run dev      # http://localhost:3000
npm run lint
npm test
npm run build && npm start   # the production build
```

## Editing content

All text and photo choices are in `content/`. Pages read from these files.

| File | What it holds |
|---|---|
| `content/seasons.js` | Seasons: stats, robot, specs, results, calendar, photo sliders, awards |
| `content/team.js` | Students, coaches, mission, about text |
| `content/sponsors.js` | Sponsor names and logos |
| `content/media.js` | Media page sections, trophies, RoboSaurus photos |
| `content/home.js` | Home page chips and photo rows |
| `content/pages.js` | Header titles and text for the other pages |
| `content/config.js` | Sponsor, recruitment and Instagram links; site name and address |

Rules that matter:

- Each photo appears at most once per page. Files that show the same shot are listed in
  `content/sameShot.js`, and `npm test` fails if a page repeats one.
- Never add results, scores, quotes or photos that did not happen.
- Contacts are the coaches' school emails only.
- `SPONSOR US` and the recruitment link currently point to preview pages. Change them in
  `content/config.js`.

### Adding a season

1. In `content/seasons.js`, copy the newest season object and put the copy at the **top**.
2. Set `id` (like `27-28`), `game`, `level`, `blurb`, `stats`, `robot`, `results`, `events`
   (dates as `YYYY-MM-DD`), `sliders` and `awards`. Use `[]` for anything you don't have yet,
   and leave `photo` out if there is no header photo.
3. Update the hand-kept home chips ("Awards", "State qualifications") and `seasonsLede` in
   `content/home.js`.
4. Run `npm test` and `npm run build`.

The page (`/seasons/27-28`), the nav menu and the home card appear by themselves.

### Adding photos

1. Put the file in `reference/images/` (not committed).
2. Run `npm run photos`. It writes a resized copy, without location data, to `assets/photos/`,
   regenerates `content/photos.js`, and remakes the icon and social preview image.
3. Use it as `p.fileName` (for `file-name.jpg`) in a content file, with alt text.

Photos listed in the `SKIP` set in `scripts/prepare-photos.mjs` stay off the site on purpose.
`assets/photos/trojan-horse.png` was added straight to `assets/photos/`; the script keeps it.

## Chart data

A chart appears only when its CSV has rows. Until then the page has no chart section and
does not download the chart library.

**`content/data/pid-runs.csv`** (Software page)

```
run,time_ms,target_deg,actual_deg
```

`run` is `before` or `after` (tuning).

**`content/data/matches.csv`** (each season page)

```
season,date,event,match,our_score,opponent_score
```

`season` is the season id (like `26-27`) and `date` is `YYYY-MM-DD`. Put quotes around a value
that contains a comma.

A bad row stops the build with the file and line, for example:
`content/data/matches.csv line 2: date "2026-13-40" is not a YYYY-MM-DD date`.

To see the charts with made-up sample data, run `npm run dev` and open `/dev/charts`.
That page does not exist on the live site.

## Settings

Set these in Vercel under Project > Settings > Environment Variables, then redeploy.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | The live address, such as `https://example.com`. Used for social previews, the sitemap and canonical links. Without it, Vercel's production address is used. |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID (`G-...`). Empty means no analytics at all. |

With analytics on, page views are counted (keep GA's "page changes based on browser history
events" setting on), plus `sponsor_click`, `email_click` and `instagram_click`. Email
addresses are never sent.

## Deploying on Vercel

1. In Vercel, choose **Add New > Project** and import the GitHub repository.
2. Keep the detected Next.js settings and add the variables above.
3. Deploy. Later pushes to the production branch redeploy; other branches get preview links.

Check that your Vercel plan allows a site that asks for sponsorships before relying on it.
`/media` is meant to be the target of a printed QR code, so keep that address.

## Layout of the code

| Folder | Contents |
|---|---|
| `app/` | Routes, page metadata, `globals.css` |
| `components/` | `layout`, `content`, `motion` (Anime.js), `charts`, `loading` (shader), `analytics` |
| `components/reactbits/` | Third-party components with local changes listed in its README; not linted |
| `content/`, `lib/` | Content, chart CSVs and loaders |
| `tests/` | Unit tests and sample chart data |
