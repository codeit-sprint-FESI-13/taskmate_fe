"use client";

import * as React from "react";
import { createPortal } from "react-dom";

import { cn } from "@/utils/utils";

import { ToastContextValue } from "./types";

// 전역 상태관리 컨텍스트
export const ToastContext = React.createContext<ToastContextValue | null>(null);

const viewportClasses: Record<ToastPosition, string> = {
  "top-left": "top-0 left-0 items-start",
  "top-center": "top-0 left-1/2 -translate-x-1/2 items-center",
  "top-right": "top-0 right-0 items-end",
  "bottom-left": "bottom-0 left-0 items-start",
  "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 items-center",
  "bottom-right": "bottom-0 right-0 items-end",
};

const toastVariantClasses: Record<ToastVariant, string> = {
  default: "border-zinc-200 bg-white text-zinc-950",
  success: "border-emerald-200 bg-emerald-50 text-emerald-950",
  error: "border-rose-200 bg-rose-50 text-rose-950",
  warning: "border-amber-200 bg-amber-50 text-amber-950",
  info: "border-sky-200 bg-sky-50 text-sky-950",
};

const accentClasses: Record<ToastVariant, string> = {
  default: "bg-zinc-500",
  success: "bg-emerald-500",
  error: "bg-rose-500",
  warning: "bg-amber-500",
  info: "bg-sky-500",
};

const actionButtonClasses: Record<ToastVariant, string> = {
  default: "bg-zinc-900 text-white hover:bg-zinc-800",
  success: "bg-emerald-600 text-white hover:bg-emerald-700",
  error: "bg-rose-600 text-white hover:bg-rose-700",
  warning: "bg-amber-500 text-amber-950 hover:bg-amber-400",
  info: "bg-sky-600 text-white hover:bg-sky-700",
};

function getToastId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export type ToastProviderProps = {
  children: React.ReactNode;
  position?: ToastPosition;
  max?: number;
};

export function ToastProvider({
  children,
  position = "top-right",
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
        closable: options.closable ?? true,
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
                viewportClasses[position],
              )}
            >
              {toasts.map((item) => (
                <ToastItem
                  key={item.id}
                  toast={item}
                  onDismiss={dismiss}
                  position={position}
                />
              ))}
            </div>,
            document.body,
          )
        : null}
    </ToastContext.Provider>
  );
}

type ToastItemProps = {
  toast: ToastRecord;
  onDismiss: (id: string) => void;
  position: ToastPosition;
};

function ToastItem({ toast, onDismiss, position }: ToastItemProps) {
  const [visible, setVisible] = React.useState(false);

  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const remainingRef = React.useRef(toast.duration);
  const startTimeRef = React.useRef(0);

  const isBottom = position.startsWith("bottom");

  const clearTimer = React.useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const close = React.useCallback(() => {
    clearTimer();
    setVisible(false);

    window.setTimeout(() => {
      onDismiss(toast.id);
    }, 180);
  }, [clearTimer, onDismiss, toast.id]);

  const startTimer = React.useCallback(
    (ms: number) => {
      if (ms <= 0) return;

      clearTimer();
      remainingRef.current = ms;
      startTimeRef.current = Date.now();

      timerRef.current = setTimeout(() => {
        close();
      }, ms);
    },
    [clearTimer, close],
  );

  React.useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setVisible(true);
    });

    if (toast.duration > 0) {
      startTimer(toast.duration);
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimer();
    };
  }, [toast.duration, startTimer, clearTimer]);

  const handleMouseEnter = () => {
    if (toast.duration <= 0 || !timerRef.current) return;

    clearTimer();
    const elapsed = Date.now() - startTimeRef.current;
    remainingRef.current = Math.max(0, remainingRef.current - elapsed);
  };

  const handleMouseLeave = () => {
    if (toast.duration <= 0) return;
    startTimer(remainingRef.current);
  };

  return (
    <div
      role={toast.variant === "error" ? "alert" : "status"}
      aria-live={toast.variant === "error" ? "assertive" : "polite"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "pointer-events-auto w-full overflow-hidden rounded-xl border shadow-lg backdrop-blur transition-all duration-200",
        toastVariantClasses[toast.variant],
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : isBottom
            ? "translate-y-2 scale-[0.98] opacity-0"
            : "-translate-y-2 scale-[0.98] opacity-0",
      )}
    >
      <div className="flex items-start gap-3 p-4">
        <div
          className={cn(
            "mt-1 h-2.5 w-2.5 shrink-0 rounded-full",
            accentClasses[toast.variant],
          )}
        />

        <div className="min-w-0 flex-1">
          {toast.title ? (
            <div className="text-sm leading-none font-semibold">
              {toast.title}
            </div>
          ) : null}

          {toast.description ? (
            <div
              className={cn(
                "text-sm text-zinc-600",
                toast.title ? "mt-1.5" : "",
              )}
            >
              {toast.description}
            </div>
          ) : null}

          {toast.action ? (
            <div className="mt-3">
              <button
                type="button"
                onClick={() => {
                  toast.action?.onClick?.();
                  close();
                }}
                className={cn(
                  "inline-flex h-8 items-center rounded-md px-3 text-xs font-medium transition-colors",
                  actionButtonClasses[toast.variant],
                )}
              >
                {toast.action.label}
              </button>
            </div>
          ) : null}
        </div>

        {toast.closable ? (
          <button
            type="button"
            onClick={close}
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-black/5 hover:text-zinc-700"
            aria-label="닫기"
          >
            ×
          </button>
        ) : null}
      </div>
    </div>
  );
}
