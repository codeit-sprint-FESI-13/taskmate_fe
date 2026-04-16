"use client";

import { cva } from "class-variance-authority";
import { useEffect, useRef, useState } from "react";

import { Icon } from "@/components/common/Icon";
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
      </button>

      {open && (
        <div
          className={cn(
            "fixed z-50",
            placement === "aside"
              ? "top-40 left-12"
              : "bottom-[30px] left-[50px]",
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
