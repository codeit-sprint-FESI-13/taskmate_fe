import type { CSSProperties } from "react";

import { cn } from "@/utils/utils";

export type SpacingDirection = "vertical" | "horizontal";

export interface SpacingProps {
  size: number;
  direction?: SpacingDirection;
  style?: CSSProperties;
  className?: string;
}

export const Spacing = ({
  size,
  direction = "vertical",
  style,
  className,
}: SpacingProps) => {
  const defaultStyle: CSSProperties =
    direction === "vertical"
      ? { height: size, width: "100%" }
      : { width: size, height: 1 };

  return (
    <div
      aria-hidden="true"
      className={cn("shrink-0", className)}
      style={{ ...defaultStyle, ...style }}
    />
  );
};
