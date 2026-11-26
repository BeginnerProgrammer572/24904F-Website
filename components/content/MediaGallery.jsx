"use client";

import Image, { getImageProps } from "next/image";
import { useMounted } from "@/components/motion/hooks";
import Masonry from "@/components/reactbits/Masonry";
import { GRID_SIZES } from "./PhotoGrid";

// Masonry draws plain <img> tags, so hand it next/image's optimised URLs.
const optimised = (src, width) =>
  getImageProps({ src, alt: "", width, height: Math.round((width * src.height) / src.width) }).props.src;

const masonryItems = (items) =>
  items.map((item) => ({
    id: item.src.src,
    // getImageProps returns the 2x source, so these ask for 640 and 1920 px.
    img: optimised(item.src, 320),
    full: optimised(item.src, 960),
    width: item.src.width,
    height: item.src.height,
    alt: item.alt,
  }));

export default function MediaGallery({ sections }) {
  // Masonry renders nothing on the server, so the plain grid stands in until then.
  const mounted = useMounted();

  return sections.map((section) => (
    <section className="blk" key={section.title}>
      <h2>{section.title}</h2>
      {mounted ? (
        <Masonry
          items={masonryItems(section.items)}
          columnWidth={240}
          gap={12}
          radius={0}
          animateFrom="none"
          revealOnScroll={false}
          blurToFocus={false}
          captions="none"
          draggable={false}
          hoverEffect="zoom"
        />
      ) : (
        <div className="gal">
          {section.items.map((item) => (
            <figure key={item.src.src}>
              <Image src={item.src} alt={item.alt} sizes={GRID_SIZES} style={{ objectPosition: item.position }} />
            </figure>
          ))}
        </div>
      )}
    </section>
  ));
}
