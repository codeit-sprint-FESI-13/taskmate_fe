"use client";

import { useMemo, useState } from "react";

import { MainSecondaryProgressCard } from "@/components/team/MainSecondaryProgressCard";
import { Order } from "@/components/todo/List/Order";
import { goalQueries } from "@/features/goal/query/goal.queryKey";
import { SortType } from "@/features/goal/types";
import { useTeamId } from "@/features/team/hooks/useTeamId";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll/useInfiniteScroll";
import { Icon } from "@/shared/ui/Icon";

const sortTypeByLabel: Record<string, SortType> = {
  최신순: "LATEST",
  오래된순: "OLDEST",
};

export default function GoalList() {
  const teamId = useTeamId();
  const sortOptions = ["최신순", "오래된순"];
  const [selectedSort, setSelectedSort] = useState("최신순");
  const sort = sortTypeByLabel[selectedSort] ?? "LATEST";

  const { ref, data } = useInfiniteScroll(
    goalQueries.getTeamGoalListInfinite(teamId, sort),
  );

  const size = data.pages[0].size;
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
            {size}개
          </span>
        </div>

        <Order
          options={sortOptions}
          selected={selectedSort}
          onSelect={setSelectedSort}
        />
      </div>

      <div className="max-h-[300px] w-full overflow-y-auto pr-1">
        <div className="tablet:grid-cols-2 desktop:grid-cols-3 grid w-full grid-cols-1 gap-4">
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
      </div>
    </div>
  );
}
