"use client";

import { animate, createScope, onScroll, stagger, svg } from "animejs";
import { useLayoutEffect, useRef } from "react";
import { canHide } from "./firstPaint";

// Season results. The rule draws itself as it is scrolled into view, and the
// results appear one after another. Static and complete without animation.
export default function SeasonTimeline({ results }) {
  const root = useRef(null);

  useLayoutEffect(() => {
    const hide = canHide();
    const scope = createScope({
      root,
      mediaQueries: { reduce: "(prefers-reduced-motion: reduce)" },
    }).add((self) => {
      if (self.matches.reduce) return;
      const box = root.current;
      const items = [...box.querySelectorAll("li")];
      // Already painted and on screen: leave everything as it is, so nothing blinks.
      if (!hide && box.getBoundingClientRect().top < window.innerHeight) return;

      const [line] = svg.createDrawable(box.querySelector("line"));
      animate(line, {
        draw: ["0 0", "0 1"],
        ease: "linear",
        // Drawn from the moment it appears until its end is on screen.
        autoplay: onScroll({ target: box, enter: "bottom top", leave: "bottom bottom", sync: true, repeat: false }),
      });
      animate(items, {
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 450,
        delay: stagger(80),
        ease: "outQuad",
        // "play" only: the default also pauses on leaving, which strands items half faded.
        autoplay: onScroll({ target: box, enter: "bottom top", sync: "play", repeat: false }),
      });
      return () =>
        items.forEach((el) => {
          el.style.opacity = "";
          el.style.transform = "";
        });
    });
    return () => scope.revert();
  }, [results]);

  return (
    <div className="tl-wrap" ref={root} data-timeline="">
      <svg className="tl-line" aria-hidden="true">
        <line x1="1" y1="0" x2="1" y2="100%" />
      </svg>
      <ul className="tl">
        {results.map((r) => (
          <li key={r.what} className={r.win ? "win" : undefined}>
            <div className="when">{r.when}</div>
            <div className="what">{r.what}</div>
            {r.detail && <div className="det">{r.detail}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
