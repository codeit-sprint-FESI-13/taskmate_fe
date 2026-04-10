"use client";

import Spinner from "@/components/common/Spinner";
import { cn } from "@/utils/utils";

export default function GoalInfoLoading() {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-start gap-3 rounded-4xl bg-white p-5",
        "tablet:gap-6",
        "desktop:flex-row desktop:items-center desktop:gap-5 desktop:px-8",
        "items-center justify-center",
      )}
    >
      <Spinner size={40} />
    </div>
  );
}
