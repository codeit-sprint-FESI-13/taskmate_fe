import { useEffect, useMemo } from "react";

import { useOverlayStore } from "./index.store";

interface Options {
  exitOnUnmount?: boolean;
}

export const useOverlay = ({ exitOnUnmount = true }: Options = {}) => {
  const { push, pop, clear } = useOverlayStore();

  useEffect(() => {
    return () => {
      if (exitOnUnmount) {
        clear();
      }
    };
  }, [exitOnUnmount, clear]);

  return useMemo(
    () => ({
      open: (id: string, element: React.ReactNode) => push(id, element),
      close: () => pop(),
    }),
    [push, pop],
  );
};
