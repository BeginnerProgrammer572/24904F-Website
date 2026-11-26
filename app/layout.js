import { Big_Shoulders, IBM_Plex_Sans } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import { loadingFx } from "@/components/loading/fx";
import { heroWait } from "@/components/motion/heroWait";
import { site } from "@/content/config";
import "./globals.css";

// "Big Shoulders Display" is the largest optical size of this family (see globals.css).
// next/font has no fallback metrics for it, so that adjustment is off.
const display = Big_Shoulders({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-big-shoulders",
  adjustFontFallback: false,
});
const body = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex" });

export const metadata = {
  title: { default: site.title, template: `%s | ${site.team} ${site.number}` },
  description: site.description,
};

export default function RootLayout({ children }) {
  return (
    // The head script adds data-hero-wait before React starts. This silences that one
    // expected difference; it covers <html>'s own attributes, not anything inside it.
    <html lang="en" className={`${display.variable} ${body.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Inline so it can cover loading content before any bundle arrives. */}
        <script dangerouslySetInnerHTML={{ __html: `(${loadingFx})();(${heroWait})()` }} />
      </head>
      <body>
        <a className="skip" href="#content">Skip to content</a>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
