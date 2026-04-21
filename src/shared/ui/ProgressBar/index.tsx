import { cn } from "@/shared/utils/styles/cn";

export type ProgressColor = "blue" | "green";
export type ProgressVariant = "on-color" | "on-white";

interface ProgressBarProps {
  value: number;
  size?: "sm" | "lg";
  color?: ProgressColor;
  variant?: ProgressVariant;
  className?: string;
  showThumb?: boolean;
}

const VARIANTS: Record<
  ProgressVariant,
  Record<ProgressColor, { track: string; indicator: string }>
> = {
  "on-color": {
    blue: {
      track: "bg-[var(--color-blue-900)]",
      indicator: "bg-[var(--color-blue-100)]",
    },
    green: {
      track: "bg-[var(--color-green-900)]",
      indicator: "bg-[var(--color-green-100)]",
    },
  },
  "on-white": {
    blue: {
      track: "bg-[var(--color-blue-300)]",
      indicator: "bg-[var(--color-blue-800)]",
    },
    green: {
      track: "bg-[var(--color-green-300)]",
      indicator: "bg-[var(--color-green-800)]",
    },
  },
};

export const ProgressBar = ({
  value = 0,
  size = "sm",
  color = "green",
  variant = "on-white",
  className,
  showThumb = false,
}: ProgressBarProps) => {
  const safeValue = Math.min(Math.max(value, 0), 100);
  const theme = VARIANTS[variant][color];

  return (
    <div
      className={cn("relative w-full", className)}
      role="progressbar"
      aria-valuenow={safeValue}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-full",
          size === "lg" ? "h-4" : "h-2",
          theme.track,
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-[width] duration-500 ease-out",
            theme.indicator,
          )}
          style={{ width: `${safeValue}%` }}
        />
      </div>

      {size === "lg" && showThumb && (
        <div
          className="absolute top-1/2 z-10 size-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white shadow-md transition-[left] duration-500 ease-out"
          style={{
            left: `${safeValue}%`,
            backgroundColor: "#ffffff",
          }}
        />
      )}
    </div>
  );
};
