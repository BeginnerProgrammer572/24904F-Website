"use client";

import { animate, createScope } from "animejs";
import { useEffect, useRef } from "react";

// The server HTML holds the final number; counting only changes what is drawn.
export default function CountUp({ value }) {
  const root = useRef(null);
  const digits = useRef(null);

  useEffect(() => {
    const scope = createScope({
      root,
      mediaQueries: { reduce: "(prefers-reduced-motion: reduce)" },
    }).add((self) => {
      const el = digits.current;
      const final = String(value);
      if (self.matches.reduce) return;
      const counter = { n: 0 };
      const show = () => (el.textContent = String(Math.round(counter.n)));
      show();
      animate(counter, { n: Number(value), duration: 900, ease: "outQuad", onUpdate: show });
      return () => (el.textContent = final);
    });
    return () => scope.revert();
  }, [value]);

  return (
    <span ref={root}>
      <span className="sr-only">{value}</span>
      <span ref={digits} aria-hidden="true">{value}</span>
    </span>
  );
}
