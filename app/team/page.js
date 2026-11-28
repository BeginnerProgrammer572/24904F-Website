import PhotoGrid from "@/components/content/PhotoGrid";
import Page from "@/components/layout/Page";
import { robosaurus } from "@/content/media";
import { pages } from "@/content/pages";
import { team } from "@/content/team";

export const metadata = { title: "Team", description: team.about };

function People({ people }) {
  return (
    <div className="grid-2">
      {people.map((p) => (
        <div className="card person" key={p.name}>
          <b>{p.name}</b>
          <span>{p.role}</span>
        </div>
      ))}
    </div>
  );
}

export default function Team() {
  return (
    <Page hero={pages.team.hero}>
      <section className="blk">
        <h2>The Team</h2>
        <p className="lede font-semibold !text-ink">{team.mission}</p>
        <p className="lede">{team.about}</p>
        <h3>Students</h3>
        <People people={team.roster} />
      </section>
      <section className="blk">
        <h3>Coaches</h3>
        <People people={team.coaches} />
      </section>
      <section className="blk">
        <h2>RoboSaurus</h2>
        <p className="lede">{pages.team.mascotLede}</p>
        <PhotoGrid items={robosaurus} />
      </section>
    </Page>
  );
}
