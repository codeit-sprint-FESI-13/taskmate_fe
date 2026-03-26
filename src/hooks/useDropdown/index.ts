import { useEffect, useRef, useState } from "react";

export function useDropdown(options: string[], initialSelected?: string) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({
    selected:
      initialSelected && options.includes(initialSelected)
        ? initialSelected
        : "",
    prevInitialSelected: initialSelected,
  });

  if (initialSelected !== state.prevInitialSelected) {
    setState({
      selected:
        initialSelected && options.includes(initialSelected)
          ? initialSelected
          : "",
      prevInitialSelected: initialSelected,
    });
  }

  const { selected } = state;
  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  const selectItem = (value: string) => {
    setState((prev) => ({ ...prev, selected: value }));
    close();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return { isOpen, selected, toggle, selectItem, containerRef };
}
