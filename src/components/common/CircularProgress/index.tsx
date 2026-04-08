import { cn } from "@/utils/utils";

import type { ProgressColor, ProgressVariant } from "../ProgressBar";

interface CircularProgressProps {
  value: number;
  size?: "sm" | "md" | "lg" | "xl";
  color?: ProgressColor;
  variant?: ProgressVariant;
  className?: string;
  showLabel?: boolean;
}

const SIZE_PX: Record<NonNullable<CircularProgressProps["size"]>, number> = {
  sm: 48,
  md: 80,
  lg: 120,
  xl: 160,
};

const TRACK_STROKE: Record<ProgressVariant, Record<ProgressColor, string>> = {
  "on-color": {
    blue: "stroke-[var(--color-blue-900)]",
    green: "stroke-[var(--color-green-900)]",
  },
  "on-white": {
    blue: "stroke-[var(--color-blue-300)]",
    green: "stroke-[var(--color-green-300)]",
  },
};

const INDICATOR_STROKE: Record<
  ProgressVariant,
  Record<ProgressColor, string>
> = {
  "on-color": {
    blue: "stroke-[var(--color-blue-100)]",
    green: "stroke-[var(--color-green-100)]",
  },
  "on-white": {
    blue: "stroke-[var(--color-blue-800)]",
    green: "stroke-[var(--color-green-800)]",
  },
};

const R = 40;
const STROKE = 10;
const C = 2 * Math.PI * R;

export const CircularProgress = ({
  value,
  size = "md",
  color = "green",
  variant = "on-white",
  className,
  showLabel = false,
}: CircularProgressProps) => {
  const safe = Math.min(Math.max(value, 0), 100);
  const offset = C * (1 - safe / 100);
  const px = SIZE_PX[size];

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center",
        className,
      )}
      style={{ width: px, height: px }}
    >
      <svg
        className="size-full"
        viewBox="0 0 100 100"
        role="progressbar"
      >
        <g transform="translate(50 50)">
          <g transform="scale(-1 1) rotate(-90)">
            <circle
              className={cn("fill-none", TRACK_STROKE[variant][color])}
              cx={0}
              cy={0}
              r={R}
              strokeWidth={STROKE}
            />
            <circle
              className={cn(
                "fill-none transition-[stroke-dashoffset] duration-500 ease-out",
                INDICATOR_STROKE[variant][color],
              )}
              cx={0}
              cy={0}
              r={R}
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={offset}
            />
          </g>
        </g>
      </svg>

      {showLabel && (
        <span
          className={cn(
            "pointer-events-none absolute inset-0 flex items-center justify-center font-semibold tabular-nums",
            size === "sm" && "typography-caption-1",
            size === "md" && "typography-body-2",
            size === "lg" && "typography-body-1",
            variant === "on-color" && "text-white",
            variant === "on-white" && "text-label-neutral",
          )}
        >
          {Math.round(safe)}%
        </span>
      )}
    </div>
  );
};
