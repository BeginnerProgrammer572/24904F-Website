import MediaGallery from "@/components/content/MediaGallery";
import Page from "@/components/layout/Page";
import { media } from "@/content/media";
import { pages } from "@/content/pages";

export const metadata = { title: "Media", description: "Competition, robot, build and trophy photos from Team 24904F." };

export default function Media() {
  return (
    <Page hero={pages.media.hero}>
      <MediaGallery sections={media} />
    </Page>
  );
}
