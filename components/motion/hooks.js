import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

const subscribe = (onChange) => {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};

// False on the server and during hydration, so the server HTML is always the
// plain, static version. True once motion is known to be welcome.
export function useMotionAllowed() {
  return useSyncExternalStore(subscribe, () => !window.matchMedia(QUERY).matches, () => false);
}

const never = () => () => {};

export function useMounted() {
  return useSyncExternalStore(never, () => true, () => false);
}
