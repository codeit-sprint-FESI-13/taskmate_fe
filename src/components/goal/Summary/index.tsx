"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { CircularProgress } from "@/components/common/CircularProgress";
import { Icon } from "@/components/common/Icon";
import { useGoalId } from "@/features/goal/hooks/useGoalId";
import { goalQueries } from "@/features/goal/query/goal.queryKey";

// @TODO: 사용자 정보(이름) 가져오기
export const Summary = () => {
  const goalId = useGoalId();
  const { data } = useSuspenseQuery(goalQueries.getSummary(goalId));

  return (
    <div className="flex w-full items-center gap-8">
      <div className="relative flex w-[55%] items-start gap-5 rounded-4xl bg-white px-8 py-[52px]">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-200">
          <Icon
            name="GoalFlag"
            size={30}
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-3 pr-10">
          <span className="typography-title-2 block w-full min-w-0 truncate font-semibold">
            {data.goalName}
          </span>
          <div className="flex items-center justify-start gap-3">
            <span className="typography-body-1 text-label-alternative">
              {data.dueDate} 까지
            </span>
            <span className="typography-body-1 text-label-alternative rounded-lg bg-gray-100 px-[10px] py-1">
              D-{data.dDay}
            </span>
          </div>
        </div>

        {/* @TODO: 메뉴 버튼 > 삭제 기능  */}
        {/* <button
          type="button"
          className="absolute top-[52px] right-8 shrink-0"
        >
          <Icon
            name="Kebab"
            size={24}
            className="text-gray-300"
          />
        </button> */}
      </div>

      <div className="flex h-[180px] w-[40%] items-start justify-start gap-8 rounded-4xl bg-blue-800 py-[30px] pl-[40px]">
        <CircularProgress
          value={data.progressPercent}
          size="lg"
          color="blue"
          variant="on-color"
        />

        <div className="flex flex-col justify-start gap-[2px] pt-2">
          <span className="typography-title-3 w-full font-semibold text-ellipsis whitespace-nowrap text-white">
            두잉두잉님의 진행도는
          </span>
          <span className="text-[56px] leading-[74px] font-medium tracking-[-1.68px] text-white">
            {data.progressPercent}
            <span className="typography-title-3 pl-1 font-semibold">%</span>
          </span>
        </div>
      </div>
    </div>
  );
};
