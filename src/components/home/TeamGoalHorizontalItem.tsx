"use client";

import { MainSecondaryProgressCard } from "@/components/team/MainSecondaryProgressCard";

export interface TeamGoalHorizontalItemProps {
  teamId: number;
  teamName: string;
  goal: {
    goalId: number;
    goalName: string;
  };
}

export function TeamGoalHorizontalItem({
  teamId,
  teamName,
  goal,
}: TeamGoalHorizontalItemProps) {
  return (
    <div className="inline-flex w-[360px] shrink-0 flex-col gap-4 rounded-4xl bg-white p-8">
      <span className="text-xl leading-[30px] font-semibold tracking-tight text-slate-800">
        {teamName}
      </span>
      <MainSecondaryProgressCard
        teamId={String(teamId)}
        goalId={goal.goalId}
        title={goal.goalName}
        progress={0}
        color="green"
        isFavorite={false}
        className="w-full shrink-0 bg-green-100"
      />
    </div>
  );
}
