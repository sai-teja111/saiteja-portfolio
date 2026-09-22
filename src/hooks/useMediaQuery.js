import { useCallback, useSyncExternalStore } from "react";

const getServerSnapshot = () => false;

/**
 * Tracks a CSS media query so animations can adapt to the layout, e.g. use
 * directional movement on wide screens and vertical movement on small ones.
 * Subscribing keeps the value in sync without any render-triggering effects.
 */
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      const mediaQueryList = window.matchMedia(query);

      mediaQueryList.addEventListener("change", onChange);

      return () => mediaQueryList.removeEventListener("change", onChange);
    },
    [query]
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query]
  );

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default useMediaQuery;