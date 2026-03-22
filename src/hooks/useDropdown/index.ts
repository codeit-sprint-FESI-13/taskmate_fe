"use client";

import { useEffect, useRef } from "react";

import { useDropdownStore } from "./index.store";

export function useDropdown(initialValue?: string) {
  const { selected, isOpen, open, close, toggle, setSelected, clear } =
    useDropdownStore();

  const containerRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 닫기
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
  }, [close]);

  const selectItem = (value: string) => {
    setSelected(value);
    close();
  };

  // 초기값 반영
  useEffect(() => {
    if (initialValue) setSelected(initialValue);
  }, [initialValue, setSelected]);

  return { selected, isOpen, toggle, selectItem, containerRef, clear };
}
