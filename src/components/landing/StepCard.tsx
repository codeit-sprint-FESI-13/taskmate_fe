import type { ReactNode } from "react";

import { Spacing } from "@/components/common/Spacing";
import { cn } from "@/utils/utils";

const badgeClass =
  "shadow-[0_4px_16px_0_rgba(255,158,89,0.20)] font-0bold text-inverse-normal flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-800 px-[13px] py-1 text-[16px] leading-[30px] tracking-[-0.48px]";

const iconRingClass =
  "flex h-[105px] w-[105px] items-center justify-center rounded-full bg-green-200";

const titleClass = cn(
  "text-label-neutral text-[18px] leading-[28px] font-bold tracking-[-0.54px]",
  "tablet:text-[22px] tablet:font-bold",
  "desktop:text-[30px] desktop:font-semibold",
);

const descClass = cn(
  "text-center text-[14px] leading-[20px] font-bold tracking-[-0.42px] text-gray-400",
  "tablet:text-[16px] tablet:font-semibold",
  "desktop:text-[20px] desktop:font-medium",
);

type Props = {
  step: number;
  illustration: ReactNode;
  title: string;
  description: ReactNode;
};

export function StepCard({ step, illustration, title, description }: Props) {
  return (
    <div className="bg-background-normal flex w-full flex-col items-center rounded-3xl px-4 py-6">
      <div className={badgeClass}>{step}</div>
      <Spacing size={24} />
      <div className={iconRingClass}>{illustration}</div>
      <Spacing size={32} />
      <div className="flex flex-col items-center gap-4">
        <span className={titleClass}>{title}</span>
        <span className={descClass}>{description}</span>
      </div>
    </div>
  );
}
