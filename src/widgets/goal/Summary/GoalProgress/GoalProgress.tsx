"use client";

import { useSuspenseQueries } from "@tanstack/react-query";

import { userQueries } from "@/entities/auth/query/user.queryKey";
import { goalQueries } from "@/entities/goal/query/goal.queryKey";
import { useGoalId } from "@/features/goal/hooks/useGoalId";
import { useBreakpoint } from "@/shared/hooks/useBreakpoint";
import { CircularProgress } from "@/shared/ui/CircularProgress";
import { cn } from "@/shared/utils/styles/cn";

export function GoalProgress() {
  const breakpoint = useBreakpoint();

  const goalId = useGoalId();

  const [
    { data: summary },
    {
      data: { nickname },
    },
  ] = useSuspenseQueries({
    queries: [goalQueries.getSummary(goalId), userQueries.myInfo()],
  });

  return (
    <div
      className={cn(
        "flex h-[154px] w-full items-center justify-start gap-5 rounded-4xl bg-blue-700 px-5 py-6",
        "tablet:p-6",
        "desktop:h-[184px] desktop:gap-8 desktop:px-[30px] desktop:py-[40px]",
      )}
    >
      <CircularProgress
        value={summary.progressPercent}
        size={breakpoint === "desktop" ? "lg" : "md"}
        color="blue"
        variant="on-color"
      />

      <div className="flex flex-col justify-start">
        <span
          className={cn(
            "typography-body-2 w-full font-semibold text-ellipsis whitespace-nowrap text-white",
            "desktop:typography-title-3",
          )}
        >
          {nickname}님의 진행도는
        </span>
        <span
          className={cn(
            "align-text-bottom text-[48px] leading-[57px] font-medium tracking-[-1.44px] text-white",
          )}
        >
          {summary.progressPercent}
          <span className="typography-title-3 pl-1 font-medium">%</span>
        </span>
      </div>
    </div>
  );
}
