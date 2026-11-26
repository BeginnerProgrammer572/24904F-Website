import { useSyncExternalStore } from "react";

const never = () => () => {};

// False on the server and during hydration, true after.
export function useMounted() {
  return useSyncExternalStore(never, () => true, () => false);
}
