"use client";

import LikeIcon from "@/components/common/Icons/LikeIcon";
import ProfileEditIcon from "@/components/common/Icons/ProfileEditIcon";
import { cn } from "@/utils/utils";

const ICON_MAP = {
  edit: ProfileEditIcon,
  like: LikeIcon,
} as const;

interface ActionButtonProps {
  action: keyof typeof ICON_MAP;
  isSmall?: boolean;
  className?: string;
}

const ActionButton = ({
  action,
  isSmall = false,
  className,
}: ActionButtonProps) => {
  // 기본(Default)은 40px, isSmall은 32px로 강제 고정
  const buttonSize = isSmall ? "w-8 h-8" : "w-10 h-10";

  const IconComponent = ICON_MAP[action];
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-blue-800 text-white",
        buttonSize,
        className,
      )}
    >
      <IconComponent />
    </div>
  );
};

export default ActionButton;
