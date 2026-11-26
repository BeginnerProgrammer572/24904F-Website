import Image, { getImageProps } from "next/image";
import LogoLoop from "@/components/reactbits/LogoLoop";

const loopItems = (sponsors) =>
  sponsors.map((s) => {
    const { props } = getImageProps({ src: s.logo, alt: `${s.name} logo` });
    return { src: props.src, srcSet: props.srcSet, alt: props.alt, width: s.logo.width, height: s.logo.height };
  });

// Both versions are in the HTML and CSS shows exactly one: the loop, or a still
// grid for reduced motion and no JavaScript (see globals.css).
export default function SponsorLogos({ sponsors }) {
  return (
    <>
      <div className="logo-band">
        <LogoLoop
          logos={loopItems(sponsors)}
          speed={60}
          // Keeps the widest logo (Wonderful Giving, 520x91) inside a 375 px screen.
          logoHeight={56}
          gap={64}
          draggable={false}
          intro={false}
          fadeOut={false}
          pauseOnHover={false}
          ariaLabel="Sponsor logos"
        />
      </div>
      <ul className="logos">
        {sponsors.map((s) => (
          <li key={s.name}>
            <Image src={s.logo} alt={`${s.name} logo`} sizes="260px" />
          </li>
        ))}
      </ul>
    </>
  );
}
