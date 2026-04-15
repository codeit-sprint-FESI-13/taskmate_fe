"use client";

import Spinner from "@/components/common/Spinner";
import { cn } from "@/utils/utils";

export default function GoalProgressLoading() {
  return (
    <div
      className={cn(
        "flex h-[154px] w-full items-center justify-start gap-5 rounded-4xl bg-blue-700 px-5 py-6",
        "tablet:p-6",
        "desktop:h-[184px] desktop:gap-8 desktop:px-[30px] desktop:py-[40px]",
        "items-center justify-center",
      )}
    >
      <Spinner size={40} />
    </div>
  );
}
