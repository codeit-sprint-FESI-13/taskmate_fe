"use client";

import { useMemo, useState } from "react";

import { Icon } from "@/components/common/Icon";
import { MainSecondaryProgressCard } from "@/components/team/MainSecondaryProgressCard";
import { Order } from "@/components/todo/List/Order";
import { goalQueries } from "@/features/goal/query/goal.queryKey";
import { SortType } from "@/features/goal/types";
import { useTeamId } from "@/features/team/hooks/useTeamId";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll/useInfiniteScroll";

const sortTypeByLabel: Record<string, SortType> = {
  최신순: "LATEST",
  오래된순: "OLDEST",
};

export const GoalList = () => {
  const teamId = useTeamId();
  const sortOptions = ["최신순", "오래된순"];
  const [selectedSort, setSelectedSort] = useState("최신순");
  const sort = sortTypeByLabel[selectedSort] ?? "LATEST";

  const { ref, data, isFetchingNextPage } = useInfiniteScroll(
    goalQueries.getTeamGoalListInfinite(teamId, sort),
  );
  const goalList = useMemo(
    () => data.pages.flatMap((page) => page.items),
    [data.pages],
  );

  return (
    <div className="flex w-full flex-col items-start gap-5">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <Icon
            name="FlagGreen"
            size={40}
          />
          <h2 className="typography-body-1 text-label-neutral font-medium">
            목표
          </h2>
          <span className="typography-body-1 ml-[-8px] font-medium text-gray-400">
            {goalList.length}개
          </span>
        </div>

        <Order
          options={sortOptions}
          selected={selectedSort}
          onSelect={setSelectedSort}
        />
      </div>

      <div className="grid w-full grid-cols-3 gap-4">
        {goalList.map((goal) => (
          <MainSecondaryProgressCard
            teamId={teamId}
            key={goal.goalId}
            goalId={goal.goalId}
            title={goal.name}
            progress={goal.progressPercent}
            color="green"
            isFavorite={goal.isFavorite}
          />
        ))}
      </div>
      <div
        ref={ref}
        className="h-1 w-full"
      />
      {isFetchingNextPage && (
        <p className="typography-body-2 w-full text-center text-gray-400">
          목표를 불러오는 중...
        </p>
      )}
    </div>
  );
};
