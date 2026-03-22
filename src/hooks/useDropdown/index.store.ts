import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface DropdownStore {
  selected: string | null;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setSelected: (value: string) => void;
  clear: () => void;
}

export const useDropdownStore = create<DropdownStore>()(
  immer((set) => ({
    selected: null,
    isOpen: false,
    open: () =>
      set((state) => {
        state.isOpen = true;
      }),
    close: () =>
      set((state) => {
        state.isOpen = false;
      }),
    toggle: () =>
      set((state) => {
        state.isOpen = !state.isOpen;
      }),
    setSelected: (value: string) =>
      set((state) => {
        state.selected = value;
      }),
    clear: () =>
      set((state) => {
        state.isOpen = false;
        state.selected = null;
      }),
  })),
);
