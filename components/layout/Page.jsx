import Image from "next/image";
import CountUp from "@/components/motion/CountUp";
import HeroEntrance from "@/components/motion/HeroEntrance";
import Reveals from "@/components/motion/Reveals";

// The wrapper matters: Next skips sticky elements when it scrolls to a new page,
// so the first child of a page must not be the sticky hero itself.
export default function Page({ hero, children }) {
  // `row` centres the title as one line, for a header with no photo; `above` is a line over it.
  // `portrait` gives a tall header photo more height, so that less of it is cropped.
  const { title, em, sub, chips, photo, position = "center 30%", row, above, tall, portrait } = hero;
  return (
    <main>
      <div className={["hero", tall ? "tall" : "short", row && "row", portrait && "portrait"].filter(Boolean).join(" ")}>
        {photo && (
          <div className="hero-img">
            <Image
              src={photo}
              alt=""
              fill
              // The largest thing on screen: fetch it first, never lazily.
              loading="eager"
              fetchPriority="high"
              sizes="100vw"
              style={{ objectPosition: position }}
            />
          </div>
        )}
        <HeroEntrance className="hero-in">
          {above && <p className="above">{above}</p>}
          <h1>
            {title}
            {em && <> <em>{em}</em></>}
          </h1>
          {sub && <p className="sub">{sub}</p>}
          {chips && (
            <dl className="chips">
              {chips.map((c) => (
                <div className="chip" key={c.k}>
                  <dt>{c.k}</dt>
                  <dd>{/^\d+$/.test(c.v) ? <CountUp value={c.v} /> : c.v}</dd>
                </div>
              ))}
            </dl>
          )}
        </HeroEntrance>
      </div>
      <div className="sheet" id="content">
        <Reveals className="sheet-in">{children}</Reveals>
      </div>
    </main>
  );
}
