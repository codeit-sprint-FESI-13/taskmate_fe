import { useEffect } from "react";

import { useOverlayStore } from "../../store/overlay/useOverlay.store";

interface Props {
  exitOnUnmount?: boolean;
}

export const useOverlay = ({ exitOnUnmount = true }: Props = {}) => {
  const { push, pop, clear } = useOverlayStore();

  useEffect(() => {
    return () => {
      if (exitOnUnmount) {
        clear();
      }
    };
  }, [exitOnUnmount, clear]);

  return {
    open: (id: string, element: React.ReactNode) => push(id, element),
    close: () => pop(),
  };
};
