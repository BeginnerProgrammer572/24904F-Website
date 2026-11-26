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
      <span className="handle-logo">
        <Image src={photos.teamLogo} alt="Team logo" sizes="120px" preload />
      </span>
      <External href={config.instagram}>{pages.media.handle}</External>
    </>
  );
  return (
    <Page hero={{ title, row: true, above: site.number, aboveClass: rye.className }}>
      <MediaGallery sections={media} />
    </Page>
  );
}
