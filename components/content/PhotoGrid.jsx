import Image from "next/image";

export const GRID_SIZES = "(max-width: 760px) 100vw, 340px";

export default function PhotoGrid({ items, className = "" }) {
  return (
    <div className={`gal ${className}`}>
      {items.map((item) => (
        <figure key={item.src.src ?? item.src}>
          <Image
            src={item.src}
            alt={item.alt}
            sizes={GRID_SIZES}
            className={item.tall ? "tall" : undefined}
            style={{ objectPosition: item.position }}
          />
        </figure>
      ))}
    </div>
  );
}
