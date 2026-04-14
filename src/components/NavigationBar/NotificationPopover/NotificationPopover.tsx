"use client";
import React, { useState } from "react";

import { Icon } from "@/components/common/Icon/index";

import NotificationPanel from "./NotificatioPanel";

const NotificationModalButton = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen((prev) => !prev);

  return (
    <div className="relative">
      <button
        className="bg-inverse-normal flex size-16 shrink-0 items-center justify-center rounded-[99px] ring-1 ring-gray-300 ring-inset"
        onClick={handleClick}
      >
        <Icon
          name="Bell"
          size={24}
          className="p-1 text-gray-500"
        />
      </button>

      {open && <NotificationPanel onClose={() => setOpen(false)} />}
    </div>
  );
};

export default NotificationModalButton;
