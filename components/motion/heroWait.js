// Inlined in <head>. Holds the header text back until HeroEntrance can animate it,
// so it never shows and then blinks. Gives up after 2 s; nothing is hidden without
// JavaScript or under reduced motion.
export function heroWait() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const html = document.documentElement;
  html.setAttribute("data-hero-wait", "");
  setTimeout(() => html.removeAttribute("data-hero-wait"), 2000);
}
