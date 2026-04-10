"use client";

import * as React from "react";

import { ToastProvider } from "@/components/common/Toast/ToastProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ToastProvider position="top-right">{children}</ToastProvider>;
}
