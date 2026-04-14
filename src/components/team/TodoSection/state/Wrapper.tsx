"use client";

import type { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}
export function Wrapper({ children }: WrapperProps) {
  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-1 flex-col">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center overflow-hidden rounded-4xl bg-white px-5 py-8">
        {children}
      </div>
    </div>
  );
}
