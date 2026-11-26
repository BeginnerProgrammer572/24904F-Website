import Image from "next/image";
import CountUp from "@/components/motion/CountUp";
import Reveals from "@/components/motion/Reveals";

// The wrapper matters: Next skips sticky elements when it scrolls to a new page,
// so the first child of a page must not be the sticky hero itself.
export default function Page({ hero, children }) {
  // `row` centres the title as one line, for a header with no photo; `above` is a line over it.
  const { title, em, sub, chips, photo, position = "center 30%", row, above, tall } = hero;
  return (
    <div>
      <div className={`hero ${tall ? "tall" : "short"}${row ? " row" : ""}`}>
        {photo && (
          <div className="hero-img">
            <Image
              src={photo}
              alt=""
              fill
              preload
              sizes="100vw"
              style={{ objectPosition: position }}
            />
          </div>
        )}
        <div className="hero-in">
          {above && <p className="above"><span>{above}</span></p>}
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
        </div>
      </div>
      <main className="sheet" id="content">
        <Reveals className="sheet-in">{children}</Reveals>
      </main>
    </div>
  );
}
