import Image, { StaticImageData } from "next/image";

import { cn } from "@/utils/utils";

import { ProgressBar } from "../common/ProgressBar";
import { StarToggleButton } from "../common/StarToggleButton";

type SecondaryColor = "blue" | "green";

interface MainSecondaryProgressCardProps {
  title: string;
  progress: number;
  color?: SecondaryColor;
  className?: string;
  iconSrc?: StaticImageData | string;
}

const THEME = {
  blue: { text: "text-[var(--color-blue-800)]" },
  green: { text: "text-[var(--color-green-800)]" },
} as const;

export const MainSecondaryProgressCard = ({
  title,
  progress,
  color = "green",
  className,
  iconSrc,
}: MainSecondaryProgressCardProps) => {
  const theme = THEME[color];

  return (
    <section
      className={cn(
        "w-full rounded-[28px] bg-white p-7 pb-8 shadow-sm ring-1 ring-black/5",
        className,
      )}
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
        {iconSrc ? (
          <Image
            src={iconSrc}
            alt=""
            width={24}
            height={24}
            className="size-6 shrink-0 object-contain"
          />
        ) : (
          <StarToggleButton />
        )}
      </div>

      <div className="flex items-center gap-4">
        <ProgressBar
          value={progress}
          size="sm"
          color={color}
          variant="on-white"
          className="flex-1"
        />
        <span
          className={cn(
            "typography-body-2 shrink-0 font-bold tabular-nums",
            theme.text,
          )}
        >
          {progress}%
        </span>
      </div>
    </section>
  );
};
