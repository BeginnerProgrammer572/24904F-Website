"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { site } from "@/content/config";
import { photos } from "@/content/photos";
import { latestSeason, seasonHref, seasons } from "@/content/seasons";

const TABS = [
  ["/", "Home"],
  [seasonHref(latestSeason), "Seasons"],
  ["/software", "Software"],
  ["/team", "Team"],
  ["/awards", "Awards"],
  ["/media", "Media"],
  ["/sponsors", "Sponsors"],
];

const subscribe = (onChange) => {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
};

export default function Nav() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribe, () => window.scrollY > 40, () => false);
  // Escape or choosing an item closes the menu until the pointer or focus leaves.
  const [closed, setClosed] = useState(false);
  const inSeasons = pathname.startsWith("/seasons");
  const reopen = () => setClosed(false);

  return (
    <header className={`nav${scrolled ? " solid" : ""}`}>
      <nav className="nav-in" aria-label="Main">
        <Link className="brand" href="/" aria-label={`${site.team} ${site.number}, home`}>
          <Image src={photos.teamLogo} alt="" width={44} height={44} />
          <b>{site.team} <i>{site.number}</i></b>
        </Link>
        <div className="links">
          {TABS.map(([href, label]) => {
            const isSeasons = label === "Seasons";
            const current = isSeasons ? inSeasons : pathname === href;
            const link = (
              <Link key={label} href={href} aria-current={current ? "page" : undefined}>
                {label}
              </Link>
            );
            if (!isSeasons) return link;
            return (
              <div
                key={label}
                className={`dd${closed ? " closed" : ""}`}
                onMouseLeave={reopen}
                onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && reopen()}
                onKeyDown={(e) => {
                  if (e.key !== "Escape") return;
                  e.currentTarget.querySelector("a").focus();
                  setClosed(true);
                }}
              >
                {link}
                <ul className="menu">
                  {seasons.map((s) => (
                    <li key={s.id}>
                      <Link href={seasonHref(s)} onClick={() => setClosed(true)}>
                        {s.id}
                        <small>{s.game.toUpperCase()}</small>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </nav>
      {inSeasons && (
        <nav className="seasons-bar" aria-label="Seasons">
          <div className="seasons-in">
            {seasons.map((s) => (
              <Link key={s.id} href={seasonHref(s)} aria-current={pathname === seasonHref(s) ? "page" : undefined}>
                {s.id}
                <small>{s.game}</small>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
