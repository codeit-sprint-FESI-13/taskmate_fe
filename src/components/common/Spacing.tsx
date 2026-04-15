import type { CSSProperties } from "react";

import { cn } from "@/utils/utils";

export type SpacingDirection = "vertical" | "horizontal";

export interface SpacingProps {
  size: number;
  direction?: SpacingDirection;
  style?: CSSProperties;
  className?: string;
  useClassSize?: boolean;
}

export const Spacing = ({
  size,
  direction = "vertical",
  style,
  className,
  useClassSize = false,
}: SpacingProps) => {
  const defaultStyle: CSSProperties =
    direction === "vertical"
      ? {
          width: "100%",
          ...(useClassSize ? {} : { height: size }),
        }
      : {
          height: 1,
          ...(useClassSize ? {} : { width: size }),
        };

  return (
    <div
      aria-hidden="true"
      className={cn("shrink-0", className)}
      style={{ ...defaultStyle, ...style }}
    />
  );
};
