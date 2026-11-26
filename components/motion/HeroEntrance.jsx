"use client";

import { animate, createScope, stagger } from "animejs";
import { useLayoutEffect, useRef } from "react";
import { canHide } from "./firstPaint";

// The one hero entrance: header text rises into place each time a page opens.
export default function HeroEntrance({ children, className }) {
  const root = useRef(null);

  useLayoutEffect(() => {
    // False means the text is already on screen, so leave it there.
    const hide = canHide();
    const scope = createScope({
      root,
      mediaQueries: { reduce: "(prefers-reduced-motion: reduce)" },
    }).add((self) => {
      if (self.matches.reduce || !hide) return;
      const parts = [...root.current.children].flatMap((el) =>
        el.classList.contains("chips") ? [...el.children] : [el],
      );
      const clear = () =>
        parts.forEach((el) => {
          el.style.opacity = "";
          el.style.transform = "";
        });
      animate(parts, {
        opacity: [0, 1],
        translateY: [24, 0],
        duration: 600,
        delay: stagger(80),
        ease: "outQuad",
        onComplete: clear,
      });
      return clear;
    });
    document.documentElement.removeAttribute("data-hero-wait");
    return () => scope.revert();
  }, []);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
