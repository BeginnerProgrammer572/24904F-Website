"use client";

import Image, { getImageProps } from "next/image";
import { useState } from "react";
import { useMotionAllowed } from "@/components/motion/hooks";
import LogoLoop from "@/components/reactbits/LogoLoop";

const loopItems = (sponsors) =>
  sponsors.map((s) => {
    const { props } = getImageProps({ src: s.logo, alt: `${s.name} logo` });
    return { src: props.src, srcSet: props.srcSet, alt: props.alt, width: s.logo.width, height: s.logo.height };
  });

export default function SponsorLogos({ sponsors }) {
  const moving = useMotionAllowed();
  const [paused, setPaused] = useState(false);

  // Static grid: server HTML, no JavaScript, and reduced motion.
  if (!moving) {
    return (
      <ul className="logos">
        {sponsors.map((s) => (
          <li key={s.name}>
            <Image src={s.logo} alt={`${s.name} logo`} sizes="260px" />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <div className="logo-band">
        <LogoLoop
          logos={loopItems(sponsors)}
          speed={paused ? 0 : 60}
          // Keeps the widest logo (Wonderful Giving, 520x91) inside a 375 px screen.
          logoHeight={56}
          gap={64}
          draggable={false}
          intro={false}
          fadeOut={false}
          pauseOnHover
          ariaLabel="Sponsor logos"
        />
      </div>
      <button type="button" className="btn alt mt-3" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
        Pause logos
      </button>
    </>
  );
}
