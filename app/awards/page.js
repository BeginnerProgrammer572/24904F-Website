import Link from "next/link";
import { AwardsList } from "@/components/content/blocks";
import Page from "@/components/layout/Page";
import { pages } from "@/content/pages";
import { allAwards, seasonHref, seasons } from "@/content/seasons";

export const metadata = { title: "Awards", description: "Awards by season for Team 24904F." };

export default function Awards() {
  return (
    <Page hero={pages.awards.hero}>
      {seasons.filter((s) => s.awards.length > 0).map((s) => (
        <section className="blk" key={s.id}>
          <h2>
            {s.id}{" "}
            <Link href={seasonHref(s)} className="text-[.5em] text-gold-dark underline">{s.game}</Link>
          </h2>
          <AwardsList awards={allAwards.filter((a) => a.season === s.id)} />
        </section>
      ))}
    </Page>
  );
}
