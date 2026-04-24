import type { ReactNode } from "react";

const labelClass =
  "text-inverse-normal text-[16px] leading-[30px] font-bold tracking-[-0.48px]";

type Props = {
  icon: ReactNode;
  children: ReactNode;
};

export function FeatureBullet({ icon, children }: Props) {
  return (
    <div className="flex items-center justify-start gap-4">
      <span className="flex shrink-0">{icon}</span>
      <span className={labelClass}>{children}</span>
    </div>
  );
}
