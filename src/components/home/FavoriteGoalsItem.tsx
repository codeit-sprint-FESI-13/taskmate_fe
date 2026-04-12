"use client";

import { MainSecondaryProgressCard } from "@/components/team/MainSecondaryProgressCard";

export interface FavoriteGoalsItemProps {
  teamId: number;
  teamName: string;
  goal: {
    goalId: number;
    goalName: string;
  };
}

export function FavoriteGoalsItem({
  teamId,
  teamName,
  goal,
}: FavoriteGoalsItemProps) {
  return (
    <div className="tablet:w-77.5 desktop:w-104 inline-flex w-full shrink-0 flex-col gap-4 rounded-4xl bg-white px-7 pt-7 pb-8">
      <span className="text-xl leading-7.5 font-semibold tracking-tight text-slate-800">
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
