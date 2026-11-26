import Image from "next/image";
import CountUp from "@/components/motion/CountUp";
import Reveals from "@/components/motion/Reveals";

// The wrapper matters: Next skips sticky elements when it scrolls to a new page,
// so the first child of a page must not be the sticky hero itself.
export default function Page({ hero, children }) {
  const { title, em, sub, chips, photo, position = "center 30%", logo, tall } = hero;
  return (
    <div>
      <div className={`hero ${tall ? "tall" : "short"}${logo ? " logo" : ""}`}>
        {photo && (
          <div className="hero-img">
            <Image
              src={photo}
              alt=""
              fill
              preload
              sizes={logo ? "400px" : "100vw"}
              style={{ objectPosition: logo ? "center" : position }}
            />
          </div>
        )}
        <div className="hero-in">
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
