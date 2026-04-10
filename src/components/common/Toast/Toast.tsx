import * as React from "react";

import { cn } from "@/utils/utils";

import { Icon } from "../Icon";
import { ToastRecord } from "./types";

type ToastProps = {
  toast: ToastRecord;
  onDismiss: (id: string) => void;
};

export function Toast({ toast, onDismiss }: ToastProps) {
  const [visible, setVisible] = React.useState(false);

  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const remainingRef = React.useRef(toast.duration);
  const startTimeRef = React.useRef(0);

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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "tablet:px-8 tablet:py-6 tablet:gap-3 pointer-events-auto flex w-[335px] items-center justify-start gap-2 rounded-2xl bg-[rgba(17,24,39,0.72)] px-5 py-4 shadow-lg transition-all duration-200",
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-2 scale-[0.98] opacity-0",
      )}
    >
      <Icon
        name={toast.variant === "error" ? "AlertError" : "AlertSuccess"}
        className="tablet:h-8 tablet:w-8 h-6 w-6"
      />

      <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
        {toast.title && (
          <span className="typography-label-1 tablet:typography-heading-2 text-inverse-normal font-semibold">
            {toast.title}
          </span>
        )}

        {toast.description && (
          <span className="typography-caption-1 tablet:typography-label-1 text-inverse-alternative truncate font-medium">
            {toast.description}
          </span>
        )}
      </div>
    </div>
  );
}
