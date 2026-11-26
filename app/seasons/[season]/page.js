import { notFound } from "next/navigation";
import { MatchSection } from "@/components/charts/ChartSections";
import { loadMatches } from "@/lib/chartData";
import { Calendar, SeasonVideo, SpecTable } from "@/components/content/blocks";
import PhotoGrid from "@/components/content/PhotoGrid";
import PhotoSlider from "@/components/content/PhotoSlider";
import Page from "@/components/layout/Page";
import SeasonTimeline from "@/components/motion/SeasonTimeline";
import { getSeason, seasons } from "@/content/seasons";

export const dynamicParams = false;

export function generateStaticParams() {
  return seasons.map((s) => ({ season: s.id }));
}

export async function generateMetadata({ params }) {
  const season = getSeason((await params).season);
  return season ? { title: `${season.game} ${season.id}`, description: season.blurb } : {};
}

export default async function SeasonPage({ params }) {
  const season = getSeason((await params).season);
  if (!season) notFound();
  const { robot } = season;

  return (
    <Page
      hero={{
        title: season.game,
        em: season.id,
        sub: `${season.level.split(" · ").join(", ")}. ${season.blurb}`,
        chips: season.stats,
        photo: season.photo,
        position: season.position,
      }}
    >
      <section className="blk">
        <div className="grid-2">
          <div className="card">
            <h2>{robot.name ? `Robot: ${robot.name}` : "The Robot and Code"}</h2>
            <p>{robot.desc}</p>
            <SpecTable specs={robot.specs} />
          </div>
          <div className="card">
            <h2>Results</h2>
            <SeasonTimeline results={season.results} />
          </div>
        </div>
      </section>
      <MatchSection matches={loadMatches(season.id)} />
      {season.events.length > 0 && (
        <section className="blk">
          <h2>Season Calendar</h2>
          <Calendar events={season.events} />
        </section>
      )}
      {season.gallery && (
        <section className="blk">
          <h2>Photos</h2>
          <PhotoGrid items={season.gallery} />
          {season.video && <SeasonVideo {...season.video} />}
        </section>
      )}
      {season.sliders.map((slider) => (
        <section className="blk" key={slider.title}>
          <h2>{slider.title}</h2>
          <PhotoSlider {...slider} />
        </section>
      ))}
    </Page>
  );
}
