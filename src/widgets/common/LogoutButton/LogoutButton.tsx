"use client";
import React from "react";

import { useOverlay } from "@/shared/hooks/useOverlay";
import { Icon } from "@/shared/ui/Icon/index";
import { LogoutModal } from "@/widgets/auth/LogoutModal";

const LogoutButton = () => {
  const overlay = useOverlay();

  const handleClick = () => {
    overlay.open(
      "logout-modal",
      <LogoutModal onClose={() => overlay.close()} />,
    );
  };
  return (
    <button
      className="bg-inverse-normal flex size-16 shrink-0 items-center justify-center rounded-[99px] ring-1 ring-gray-300 ring-inset"
      onClick={handleClick}
    >
      <Icon
        name="Out"
        size={24}
        className="p-1 text-gray-500"
      />
    </button>
  );
};

export default LogoutButton;
