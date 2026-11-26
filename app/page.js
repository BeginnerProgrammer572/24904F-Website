import Link from "next/link";
import { AwardsList, InstagramButtons, SeasonCards } from "@/components/content/blocks";
import PhotoGrid from "@/components/content/PhotoGrid";
import HashRedirect from "@/components/HashRedirect";
import Page from "@/components/layout/Page";
import { site } from "@/content/config";
import { home } from "@/content/home";
import { trophies } from "@/content/media";
import { allAwards, seasons } from "@/content/seasons";
import { team } from "@/content/team";

export default function Home() {
  return (
    <Page hero={{ ...home.hero, tall: true, title: site.team, chips: home.chips }}>
      <HashRedirect />
      <section className="blk">
        <h2>Our Seasons</h2>
        <p className="lede">{home.seasonsLede}</p>
        <SeasonCards seasons={seasons} />
      </section>
      <section className="blk">
        <h2>At Competition</h2>
        <PhotoGrid items={home.competition} />
      </section>
      <section className="blk">
        <h2>Trophies</h2>
        <PhotoGrid items={trophies} />
      </section>
      <section className="blk">
        <h2>Awards</h2>
        <AwardsList awards={allAwards} showSeason />
        <Link className="btn" href="/awards">All awards</Link>
      </section>
      <section className="blk">
        <h2>How We Build</h2>
        <p className="lede">{home.buildLede}</p>
        <PhotoGrid items={home.build} />
      </section>
      <section className="blk">
        <h2>About the Team</h2>
        <p className="lede">{team.about}</p>
        <Link className="btn" href="/team">Meet the team</Link>
        <InstagramButtons />
      </section>
    </Page>
  );
}
