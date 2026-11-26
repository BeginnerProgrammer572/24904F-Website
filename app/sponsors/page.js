import { InstagramButtons, SponsorButton } from "@/components/content/blocks";
import SponsorLogos from "@/components/content/SponsorLogos";
import Page from "@/components/layout/Page";
import { pages } from "@/content/pages";
import { sponsors } from "@/content/sponsors";
import { team } from "@/content/team";

export const metadata = { title: "Sponsors", description: pages.sponsors.pitch };

export default function Sponsors() {
  return (
    <Page hero={pages.sponsors.hero}>
      <section className="blk">
        <h2 className="text-center !mb-4">THANK YOU TO OUR SPONSORS!</h2>
        <SponsorLogos sponsors={sponsors} />
      </section>
      <section className="blk">
        <h2>Become a sponsor</h2>
        <p className="max-w-[560px] mb-4">{pages.sponsors.pitch}</p>
        <SponsorButton />
        <InstagramButtons />
      </section>
      <section className="blk">
        <h2>Sponsor outreach contacts</h2>
        <div className="grid-2">
          {team.coaches.map((c) => (
            <div className="card person" key={c.email}>
              <b>{c.name}</b>
              <span>{c.role}</span>
              <p className="mt-2">
                <a className="underline break-all" href={`mailto:${c.email}`}>{c.email}</a>
              </p>
            </div>
          ))}
        </div>
      </section>
    </Page>
  );
}
