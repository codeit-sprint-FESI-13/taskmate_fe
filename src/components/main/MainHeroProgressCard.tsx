import Image, { StaticImageData } from "next/image";

import FireIcon from "@/assets/images/fire.png";
import SettingIcon from "@/assets/images/setting.png";
import { cn } from "@/utils/utils";

import { ProgressBar } from "../common/ProgressBar";

type HeroColor = "blue" | "green";

interface MainHeroProgressCardProps {
  title: string;
  todoCount: number;
  completedCount: number;
  color?: HeroColor;
  className?: string;
  statusLabel?: string;
  statusIconSrc?: StaticImageData | string;
}

const CARD_BG: Record<HeroColor, string> = {
  blue: "bg-[var(--color-blue-800)]",
  green: "bg-[var(--color-green-800)]",
};

function StatItem({
  label,
  value,
  suffix,
}: {
  label: string;
  value: number;
  suffix: string;
}) {
  return (
    <div className="min-w-0">
      <p className="typography-body-1 mb-2 font-bold text-green-400">{label}</p>
      <p className="flex items-end gap-1 text-white">
        <span className="text-[56px] leading-none font-bold">{value}</span>
        <span className="typography-title-3 pb-0.5 font-semibold">
          {suffix}
        </span>
      </p>
    </div>
  );
}

export const MainHeroProgressCard = ({
  title,
  todoCount,
  completedCount,
  color = "green",
  className,
  statusLabel = "거의 다 왔어요",
  statusIconSrc = FireIcon,
}: MainHeroProgressCardProps) => {
  const progress =
    todoCount > 0 ? Math.round((completedCount / todoCount) * 100) : 0;

  return (
    <section
      className={cn(
        "w-full rounded-[28px] p-6 md:p-7",
        CARD_BG[color],
        className,
      )}
    >
      <div className="mb-10 flex items-center gap-2">
        <h2 className="typography-title-2 font-bold text-white">{title}</h2>
        {/* 임시 세팅 버튼 */}
        <button>
          <Image
            src={SettingIcon}
            alt="설정"
            width={32}
            height={32}
            className="size-8"
          />
        </button>
      </div>

      <div className="mb-8 flex gap-16 md:max-w-[520px]">
        <StatItem
          label="오늘의 진행 상황"
          value={progress}
          suffix="%"
        />
        <StatItem
          label="오늘의 할 일"
          value={todoCount}
          suffix="개"
        />
        <StatItem
          label="완료한 일"
          value={completedCount}
          suffix="개"
        />
      </div>

      <div className="relative">
        {/* 말풍선 */}
        {progress >= 80 && progress < 100 && (
          <div
            className="absolute top-full z-20 -translate-x-1/2 translate-y-7 transition-[left] duration-500 ease-out md:top-auto md:bottom-auto md:bottom-full md:-translate-y-7"
            style={{ left: `${progress}%` }}
          >
            <div className="relative flex items-center gap-2 rounded-full bg-gray-800 px-4.5 py-4.5 text-xs font-semibold text-white shadow-lg">
              <Image
                src={statusIconSrc}
                alt=""
                width={24}
                height={24}
                className="shrink-0 object-contain"
              />
              <span className="typography-body-2 whitespace-nowrap text-green-100">
                {statusLabel}
              </span>
              <span className="absolute bottom-full left-1/2 h-4 w-4 -translate-x-1/2 translate-y-1/2 rotate-45 bg-gray-800 md:top-full md:-translate-y-1/2" />
            </div>
          </div>
        )}

        <ProgressBar
          value={progress}
          size="lg"
          color={color}
          variant="on-color"
          showThumb
        />
      </div>
    </section>
  );
};
