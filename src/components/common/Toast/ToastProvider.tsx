"use client";

import * as React from "react";
import { createPortal } from "react-dom";

import { cn } from "@/utils/utils";

import { Toast } from "./Toast";
import { ToastContextValue, ToastOptions, ToastRecord } from "./types";

// 전역 상태관리 컨텍스트
export const ToastContext = React.createContext<ToastContextValue | null>(null);

function getToastId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export type ToastProviderProps = {
  children: React.ReactNode;
  max?: number;
};

export default function ToastProvider({
  children,
  max = 5,
}: ToastProviderProps) {
  const [mounted, setMounted] = React.useState(false);
  const [toasts, setToasts] = React.useState<ToastRecord[]>([]);

  // 클라이언트 사이드 마운트 확인(Portal 에러 방지)
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // 토스트 제거 로직: ID 기준 필터
  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  // 토스트 생성 로직
  const toast = React.useCallback(
    (options: ToastOptions) => {
      const id = options.id ?? getToastId();

      const nextToast: ToastRecord = {
        id,
        title: options.title,
        description: options.description,
        variant: options.variant ?? "default",
        duration: options.duration ?? 3000,
        action: options.action,
      };

      setToasts((prev) => [nextToast, ...prev].slice(0, max));
      return id;
    },
    [max],
  );

  const value = React.useMemo(
    () => ({
      toast,
      dismiss,
    }),
    [toast, dismiss],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      {mounted
        ? createPortal(
            <div
              className={cn(
                "pointer-events-none fixed z-[9999] flex w-full max-w-sm flex-col gap-3 p-4 sm:max-w-md",
                "bottom-0 left-1/2 -translate-x-1/2 items-center",
              )}
            >
              {toasts.map((item) => (
                <Toast
                  key={item.id}
                  toast={item}
                  onDismiss={dismiss}
                />
              ))}
            </div>,
            document.body,
          )
        : null}
    </ToastContext.Provider>
  );
}
