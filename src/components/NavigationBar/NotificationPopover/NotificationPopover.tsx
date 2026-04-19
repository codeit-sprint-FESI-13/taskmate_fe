"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { cva } from "class-variance-authority";
import { useEffect, useRef, useState } from "react";

import { Icon } from "@/components/common/Icon";
import { notificationInfiniteQueries } from "@/features/notification/query/notificationInfiniteQueries";
import { cn } from "@/utils/utils";

import NotificationPanel from "./NotificatioPanel";

const buttonVariants = cva(
  "cursor-pointer bg-inverse-normal flex shrink-0 items-center justify-center rounded-[99px]",
  {
    variants: {
      placement: {
        default: "size-16 ring-1 ring-gray-300 ring-inset",
        aside: "size-[30px]", // bell(30)와 동일
      },
    },
    defaultVariants: {
      placement: "default",
    },
  },
);

interface NotificationPopoverProps {
  placement?: "aside";
}

const NotificationPopover = ({ placement }: NotificationPopoverProps) => {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleClick = () => setOpen((prev) => !prev);

  useEffect(() => {
    if (!open) return;

    const handlePointerDownOutside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!popoverRef.current?.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDownOutside);
    return () =>
      document.removeEventListener("pointerdown", handlePointerDownOutside);
  }, [open]);

  // 알림 표시
  const { data: notificationData } = useSuspenseInfiniteQuery(
    notificationInfiniteQueries.notificationsInfinite(),
  );

  const hasUnread =
    notificationData?.pages.some((page) =>
      page.items.some((item) => item.isRead === false),
    ) ?? false;

  return (
    <div
      className="relative"
      ref={popoverRef}
    >
      <button
        className={buttonVariants({ placement })}
        onClick={handleClick}
      >
        <Icon
          name="Bell"
          size={placement === "aside" ? 30 : 24}
          className="text-gray-500"
        />

        {hasUnread && (
          <span className="absolute top-0.75 right-0.75 h-3 w-3 rounded-full bg-green-800" />
        )}
      </button>

      {open && (
        <div
          className={cn(
            "fixed z-50",
            placement === "aside" ? "top-40 left-12" : "bottom-30 left-50",
          )}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <NotificationPanel onClose={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default NotificationPopover;
