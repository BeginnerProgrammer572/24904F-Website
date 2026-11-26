"use client";

import { animate, createScope } from "animejs";
import { useEffect, useRef } from "react";

// Fades sections in as they are scrolled to. Only sections still below the screen
// are hidden, and only from JavaScript, so nothing visible ever flashes.
export default function Reveals({ children, className }) {
  const root = useRef(null);

  useEffect(() => {
    const scope = createScope({
      root,
      mediaQueries: { reduce: "(prefers-reduced-motion: reduce)" },
    }).add((self) => {
      if (self.matches.reduce) return;
      const host = root.current;
      const all = [...host.querySelectorAll(".blk")].filter(
        // The timeline section has its own animation.
        (el) => !el.querySelector("[data-timeline]") && el.getBoundingClientRect().top > window.innerHeight,
      );
      const waiting = new Set(all);
      // A leftover transform would trap fixed children such as the photo viewer.
      const clear = (el) => {
        el.style.opacity = "";
        el.style.transform = "";
      };
      const observer = new IntersectionObserver(
        (entries) => {
          for (const { target, isIntersecting, boundingClientRect } of entries) {
            // Jumping past a section (End key, anchor) must not leave it hidden.
            if (!(isIntersecting || boundingClientRect.top < 0) || !waiting.delete(target)) continue;
            observer.unobserve(target);
            animate(target, { opacity: 1, translateY: 0, duration: 500, ease: "outQuad", onComplete: () => clear(target) });
          }
        },
        { rootMargin: "0px 0px -10% 0px" },
      );
      const onFocus = (e) => {
        const section = e.target.closest(".blk");
        if (section && waiting.delete(section)) clear(section);
      };
      for (const el of all) {
        el.style.opacity = "0";
        el.style.transform = "translateY(24px)";
        observer.observe(el);
      }
      host.addEventListener("focusin", onFocus);
      return () => {
        observer.disconnect();
        host.removeEventListener("focusin", onFocus);
        all.forEach(clear);
      };
    });
    return () => scope.revert();
  }, []);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
