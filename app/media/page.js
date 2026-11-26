import { Rye } from "next/font/google";
import Image from "next/image";
import { External } from "@/components/content/blocks";
import MediaGallery from "@/components/content/MediaGallery";
import Page from "@/components/layout/Page";
import { config, site } from "@/content/config";
import { media } from "@/content/media";
import { pages } from "@/content/pages";
import { photos } from "@/content/photos";

export const metadata = { title: "Media", description: "Competition, robot, build and trophy photos from Team 24904F." };

// Used for the team number in this page's header only.
const rye = Rye({ subsets: ["latin"], weight: "400" });

export default function Media() {
  const title = (
    <>
      {/* Instagram's glyph in its own colours; the link beside it carries the name. */}
      <Image className="handle-glyph" src={photos.instagramGlyph} alt="" sizes="80px" loading="eager" />
      <External href={config.instagram}>{pages.media.handle}</External>
    </>
  );
  // The team number with the horse standing in for the F; read aloud as "24904F".
  const number = (
    <span className="number" role="img" aria-label={site.number}>
      <span className={`digits ${rye.className}`} aria-hidden="true">{site.number.slice(0, -1)}</span>
      <Image src={photos.trojanHorse} alt="" sizes="200px" loading="eager" fetchPriority="high" />
    </span>
  );
  return (
    <Page hero={{ title, row: true, above: number }}>
      <MediaGallery sections={media} />
    </Page>
  );
}
