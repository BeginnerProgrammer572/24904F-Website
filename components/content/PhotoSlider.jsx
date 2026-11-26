"use client";

import Image from "next/image";
import { useRef } from "react";

export default function PhotoSlider({ title, items }) {
  const track = useRef(null);
  const move = (direction) => {
    const el = track.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * Math.round(el.clientWidth * 0.8), behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div className="car">
      <button type="button" className="square-btn prev" aria-label="Previous" onClick={() => move(-1)}>&#8249;</button>
      <div className="car-track" ref={track} tabIndex={0} role="region" aria-label={title}>
        {items.map((item) => (
          <figure key={item.src.src ?? item.src}>
            <Image src={item.src} alt={item.alt} sizes="340px" style={{ objectPosition: item.position }} />
          </figure>
        ))}
      </div>
      <button type="button" className="square-btn next" aria-label="Next" onClick={() => move(1)}>&#8250;</button>
    </div>
  );
}
