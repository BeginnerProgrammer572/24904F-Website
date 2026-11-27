import Image from "next/image";
import Link from "next/link";
import { config } from "@/content/config";
import { seasonHref } from "@/content/seasons";

export function External({ href, children, className }) {
  return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}</a>;
}

export function SponsorButton() {
  return <External className="btn" href={config.sponsorPage}>SPONSOR US</External>;
}

export function InstagramButtons() {
  return (
    <>
      <External className="btn alt" href={config.instagram}>@foothill_robotics</External>
      <External className="btn alt" href={config.coachInstagram}>@roboticsatthehill</External>
    </>
  );
}

export function SeasonCards({ seasons }) {
  return (
    <div className="grid-3">
      {seasons.map((s) => (
        <Link className="scard" href={seasonHref(s)} key={s.id}>
          {s.photo && (
            <Image
              src={s.photo}
              alt=""
              fill
              sizes="(max-width: 760px) 100vw, 340px"
              style={s.focusCard ? { objectPosition: s.position } : undefined}
            />
          )}
          <div>
            <b>{s.game}</b>
            <span>{s.id}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function AwardsList({ awards, showSeason }) {
  return (
    <ul className="awards">
      {awards.map((a) => (
        <li key={`${a.season}-${a.title}`}>
          <span className="what">{a.title} <span className="at">{a.at}</span></span>
          {showSeason && <span className="when">{a.season}</span>}
        </li>
      ))}
    </ul>
  );
}

export function SpecTable({ specs }) {
  return (
    <table className="spec">
      <tbody>
        {specs.map(([name, value]) => (
          <tr key={name}>
            <th scope="row">{name}</th>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Never autoplays; only its metadata is fetched until someone presses play.
export function SeasonVideo({ src, poster, label }) {
  return (
    <video className="season-video" src={src} poster={poster} aria-label={label} controls muted playsInline preload="metadata">
      <a href={src}>{label}</a>
    </video>
  );
}

const shortDate =new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

export function Calendar({ events }) {
  return (
    <ul className="cal">
      {events.map((e) => (
        <li key={e.date}>
          <time className="d" dateTime={e.date}>{shortDate.format(new Date(e.date))}</time>
          <span className="n">
            {e.name}
            {e.detail && <small>{e.detail}</small>}
          </span>
        </li>
      ))}
    </ul>
  );
}
