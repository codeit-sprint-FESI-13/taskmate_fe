"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import Button from "@/components/common/Button/Button";
import { Icon } from "@/components/common/Icon";
import { Spacing } from "@/components/common/Spacing";
import { TeamGoalHorizontalItem } from "@/components/home/TeamGoalHorizontalItem";
import { teamQueries } from "@/features/team/query/team.queryKey";

export function TeamGoalsHorizontalSection() {
  const { data: teamList } = useSuspenseQuery(teamQueries.all());
  const router = useRouter();
  const items = teamList.flatMap((team) =>
    team.goals.map((goal) => ({
      teamId: team.teamId,
      teamName: team.teamName,
      goal,
    })),
  );

  if (items.length === 0) {
    return (
      <div className="flex h-[210px] w-full flex-col items-center justify-center gap-1 rounded-4xl bg-white">
        <span className="typography-heading-2 text-gray-500">
          팀이 비어있어요
        </span>
        <span className="typography-body-1 text-gray-400">
          팀을 만들고 할 일을 함께 관리해보세요
        </span>
        <Spacing size={16} />
        <Button
          onClick={() => {
            router.push("/taskmate/team/create");
          }}
        >
          <div className="flex items-center gap-2">
            <Icon
              name="Plus"
              size={16}
            />
            <span className="typography-label-1 font-semibold text-white">
              팀 만들기
            </span>
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full min-w-0">
      <div className="w-full min-w-0 overflow-x-auto overflow-y-hidden overscroll-x-contain">
        <div className="inline-flex w-max flex-nowrap gap-4 pb-2">
          {items.map(({ teamId, teamName, goal }) => (
            <TeamGoalHorizontalItem
              key={`${teamId}-${goal.goalId}`}
              teamId={teamId}
              teamName={teamName}
              goal={goal}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
