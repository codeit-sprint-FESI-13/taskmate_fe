"use client";

import { useSuspenseQueries } from "@tanstack/react-query";

import { CircularProgress } from "@/components/common/CircularProgress";
import { Icon } from "@/components/common/Icon";
import { userQueries } from "@/constants/queryKeys";
import { useGoalId } from "@/features/goal/hooks/useGoalId";
import { goalQueries } from "@/features/goal/query/goal.queryKey";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { cn } from "@/utils/utils";

export const Summary = () => {
  const goalId = useGoalId();
  const breakpoint = useBreakpoint();

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
        "flex w-full flex-col justify-start gap-4",
        "tablet:grid tablet:grid-cols-[55%_45%] tablet:gap-4",
      )}
    >
      <div
        className={cn(
          "relative flex w-full flex-col items-start gap-3 rounded-4xl bg-white p-5",
          "tablet:gap-6",
          "desktop:px-8 desktop:gap-5 desktop:flex-row desktop:items-center",
        )}
      >
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-200",
            "desktop:mb-[36px]",
          )}
        >
          <Icon
            name="GoalFlag"
            size={30}
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-start gap-3">
          <span
            className={cn(
              "typography-body-2 w-full truncate font-semibold",
              "tablet:typography-body-1",
              "desktop:typography-title-2",
            )}
          >
            {summary.goalName}
          </span>
          <div
            className={cn(
              "flex items-center justify-start gap-2",
              "tablet:gap-3",
            )}
          >
            <span
              className={cn(
                "typography-label-1 text-label-alternative font-semibold",
                "tablet:typography-body-2",
                "desktop:typography-body-1",
              )}
            >
              {summary.dueDate} 까지
            </span>
            <span className="typography-label-2 text-label-alternative rounded-lg bg-gray-100 px-[10px] py-1 font-semibold">
              D-{summary.dDay}
            </span>
          </div>

          <button
            type="button"
            className={cn(
              "absolute top-7 right-5 shrink-0 cursor-pointer",
              "desktop:top-[60px] desktop:right-8",
            )}
          >
            <Icon
              name="Kebab"
              size={24}
              className="text-gray-300"
            />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "flex h-[154px] w-full items-center justify-start gap-5 rounded-4xl bg-blue-700 px-5 py-6",
          "tablet:p-6",
          "desktop:px-[30px] desktop:py-[40px] desktop:h-[184px] desktop:gap-8",
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
    </div>
  );
};
