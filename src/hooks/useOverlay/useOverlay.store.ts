import type { ReactNode } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface Layer {
  id: string;
  element: ReactNode;
}

interface OverlayStore {
  layer: Layer[];
  push: (id: string, element: ReactNode) => void;
  pop: () => void;
  clear: () => void;
}

export const useOverlayStore = create<OverlayStore>()(
  immer((set) => ({
    layer: [],
    push: (id: string, element: ReactNode) =>
      set((state) => {
        state.layer.push({ id, element });
      }),
    pop: () =>
      set((state) => {
        state.layer.pop();
      }),
    clear: () =>
      set((state) => {
        state.layer = [];
      }),
  })),
);
