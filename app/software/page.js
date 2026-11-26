import { External, SponsorButton } from "@/components/content/blocks";
import Page from "@/components/layout/Page";
import { config } from "@/content/config";
import { pages } from "@/content/pages";

export const metadata = {
  title: "Software",
  description: pages.software.cards[2].text,
};

export default function Software() {
  return (
    <Page hero={pages.software.hero}>
      <section className="blk">
        <h2>Software</h2>
        <div className="grid-2">
          {pages.software.cards.map((card) => (
            <div className="card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="blk">
        <h2>Team pages</h2>
        <SponsorButton />
        <External className="btn alt" href={config.recruitPage}>Recruitment page</External>
      </section>
    </Page>
  );
}
