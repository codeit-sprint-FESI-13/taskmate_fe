"use client";

import Image from "next/image";
import { useState } from "react";

import StarEmpty from "@/assets/images/star-empty.png";
import StarFill from "@/assets/images/star-fill.png";
import { cn } from "@/utils/utils";

interface StarToggleButtonProps {
  initialState?: boolean;
  onToggle?: (isFilled: boolean) => void;
  size?: number;
  className?: string;
}

export const StarToggleButton = ({
  initialState = false,
  onToggle,
  size = 32,
  className,
}: StarToggleButtonProps) => {
  const [isFilled, setIsFilled] = useState(initialState);

  const handleToggle = () => {
    const newState = !isFilled;
    setIsFilled(newState);
    onToggle?.(newState);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={cn(
        "relative flex cursor-pointer items-center justify-center transition-transform active:scale-90",
        className,
      )}
      aria-label={isFilled ? "즐겨찾기 해제" : "즐겨찾기 추가"}
      aria-pressed={isFilled}
    >
      <Image
        src={isFilled ? StarFill : StarEmpty}
        alt=""
        width={size}
        height={size}
        className="object-contain"
      />
    </button>
  );
};
