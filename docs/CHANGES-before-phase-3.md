# Change plan: complete before Phase 3

## Instructions for the agent
1. Read `docs/BRIEF.md`, this file and the current code. Phases 1 and 2 are committed.
2. Reply with an implementation plan listing the files you will change. **Write no code until I approve it.**
3. Where this file conflicts with the brief, this file wins. Update the brief to match.
4. Do not start Phase 3.
5. Afterward, run lint and `next build`, show screenshots of every route at 375, 768 and 1440 px, then stop for my review.

## 1. Sponsor logo loop
- Remove the "Pause logos" button and its unused state, styles and handlers.
- The logos slide continuously at one constant speed. No pause or slowdown on hover, focus, touch, click or scroll.
- The loop is seamless, with no visible jump or gap at any screen width.
- For visitors with `prefers-reduced-motion`, show all logos in a still grid instead of the loop.

## 2. No repeated photos on a page
Each photo appears at most once per page, counting headers, cards, galleries, sliders and backgrounds. The full-screen viewer does not count.

Files with different names can show the same shot. Known matches:

| Keep | Treat as a repeat |
|---|---|
| `bebop-back.jpg` | `build-bench.jpg` |
| `bebop-side.jpg` | `lift-bench.jpg` |
| `pit-work.jpg` | `pushback-build.jpg` |
| `stadium-bench.jpg` | `stadium-tall.jpg` (tighter view of the same scene) |
| `plaques-sign.jpg` | `plaques-sign-2.jpg` (same trophies, wider view) |

- Compare the images on every route visually, including trophy crops against the full trophy photos. List any other matches in your plan.
- On each page, when both of a pair appear, keep the one in the "Keep" column. If a header or card already uses either one, keep that placement and remove the gallery or slider copy.
- Remove only the extra placement. Do not delete image files or substitute other photos.
- Fix captions and layouts so no empty gaps or headings are left.
- Exempt: the nav logo, the Media header logo, and the hidden copies the logo loop needs. A sponsor page must not show both the loop and a second visible set of the same logos; if it does, keep the loop.

## 3. No shadows or glows
- Remove every `box-shadow`, `text-shadow`, `drop-shadow`, glow effect and matching Tailwind class, including those inside React Bits components.
- Keep the flat dark overlay on header photos where text needs it for contrast. Check contrast after removing text shadows.
- Keyboard focus must stay clearly visible using a solid outline.

## 4. Loading shader
- While content is loading, show a moving shader effect over each element that is still loading: photos, logos, headings, text blocks, cards, nav and charts added later.
- Use **one shared WebGL canvas** that draws over element positions. Do not create a WebGL context per element.
- Colors: black, off-white and gold `#b2a371`. No glow.
- Each element reveals as soon as it is ready. Add no artificial delay, and clear every effect after 2 seconds at most.
- Run on first load and for newly loading content after navigation. Lazy-loaded photos get it as they load.
- Content stays in the pre-rendered HTML. If JavaScript or WebGL fails, content shows normally.
- With `prefers-reduced-motion`, use a still placeholder.
- Release resources when finished, and avoid layout shift.
- In your plan, describe the approach, any dependency and the expected performance cost. Keep the brief's Lighthouse targets, and tell me if this effect prevents that.

## 5. Larger team logo
- Make the team logo in the nav 30% larger than its current rendered width and height, on all screen sizes.
- Keep its proportions. The nav must not overlap or overflow at 375 px.

## 6. Media page header
- Replace the current header logo background and title with one centered row: the team logo beside the text `@foothill_robotics`.
- Keep the handle in lowercase, with the underscore visible.
- Link the handle to https://www.instagram.com/foothill_robotics/.
- Scale to fit one row at 375 px without clipping.
- Do not redraw or recolor the logo. If its white background looks wrong, place it on a square white block or ask me for a transparent file.

## Done when
- No Pause button, and the loop never changes speed during interaction.
- No photo or matching shot appears twice on any route.
- A search of the code finds no shadow or glow styles in use.
- The loading shader works on slow network throttling and fails safely.
- Logo and Media header changes pass at all three widths.
