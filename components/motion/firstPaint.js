// Whether an effect may still hide content it is about to animate in.
// After a client-side navigation: yes, the new page is not painted yet.
// On first load: only while the head script (heroWait) is still holding it back.
let first = true;
let held = null;

export function canHide() {
  if (!first) return true;
  if (held === null) {
    held = document.documentElement.hasAttribute("data-hero-wait");
    // Every layout effect of the first commit runs before this does.
    queueMicrotask(() => (first = false));
  }
  return held;
}
