"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { Icon } from "@/components/common/Icon";
import { useGoalId } from "@/features/goal/hooks/useGoalId";
import { goalQueries } from "@/features/goal/query/goal.queryKey";
import { cn } from "@/utils/utils";

export function GoalInfo() {
  const goalId = useGoalId();

  const { data: summary } = useSuspenseQuery({
    ...goalQueries.getSummary(goalId),
  });
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-start gap-3 rounded-4xl bg-white p-5",
        "tablet:gap-6",
        "desktop:flex-row desktop:items-center desktop:gap-5 desktop:px-8",
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
  );
}
