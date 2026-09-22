import { useSyncExternalStore } from "react";

// A very small module level store that answers one question:
// "has the initial page loader finished handing over to the portfolio?"
//
// The loader writes to it once, the Hero and the Navbar read from it, so no
// component needs to be remounted or wrapped in a provider. Subscribing keeps
// the value in sync without a render triggering effect (same approach as
// useMediaQuery).

let pageReady = false;

const listeners = new Set();

function subscribe(listener) {
  listeners.add(listener);

  return () => listeners.delete(listener);
}

const getSnapshot = () => pageReady;

// Nothing is revealed during server rendering.
const getServerSnapshot = () => false;

/**
 * Marks the initial load as complete and wakes every subscriber.
 * Safe to call more than once.
 */
export function markPageReady() {
  if (pageReady) {
    return;
  }

  pageReady = true;

  listeners.forEach((listener) => listener());
}

/** True once the initial loader has started revealing the page. */
export function usePageReady() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
