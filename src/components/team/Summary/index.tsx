"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { MainHeroProgressCard } from "@/components/team/MainHeroProgressCard";
import { useTeamId } from "@/features/team/hooks/useTeamId";
import { teamQueries } from "@/features/team/query/team.queryKey";

export const Summary = () => {
  const teamId = useTeamId();
  const {
    data: {
      teamName,
      todayProgressPercent,
      todayTodoCount,
      overdueTodoCount,
      isAdmin,
      doneTodoCount,
    },
  } = useSuspenseQuery(teamQueries.summary(teamId));

  return (
    <MainHeroProgressCard
      isAdmin={isAdmin}
      title={teamName}
      progress={todayProgressPercent}
      todoCount={todayTodoCount}
      overdueTodoCount={overdueTodoCount}
      completedCount={doneTodoCount}
      color="green"
    />
  );
};
