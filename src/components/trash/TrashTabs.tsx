"use client";

import { cn } from "@/utils/utils";

export type TrashTab = "personal" | "team";

interface TrashTabsProps {
  activeTab: TrashTab;
  onTabChange: (tab: TrashTab) => void;
}

const TABS: { label: string; value: TrashTab }[] = [
  { label: "개인 스페이스", value: "personal" },
  { label: "팀 스페이스", value: "team" },
];

function TrashTabs({ activeTab, onTabChange }: TrashTabsProps) {
  return (
    <div className="tablet:h-full flex gap-2">
      {TABS.map(({ label, value }) => (
        <button
          key={value}
          type="button"
          onClick={() => onTabChange(value)}
          className={cn(
            "text-label-2 tablet:h-[42px] flex h-[38px] items-center justify-center rounded-2xl px-4 font-bold whitespace-nowrap transition-colors duration-200",
            activeTab === value
              ? "bg-gray-700 text-gray-50"
              : "bg-background-normal-alternative-2 text-gray-400",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default TrashTabs;
