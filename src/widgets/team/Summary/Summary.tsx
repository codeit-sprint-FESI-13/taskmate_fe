import { useSuspenseQuery } from "@tanstack/react-query";

import { teamQueries } from "@/entities/team/api/query/team.queryKey";
import { useTeamId } from "@/features/team/hooks/useTeamId";
import { MainHeroProgressCard } from "@/widgets/team/MainHeroProgressCard";

export default function Summary() {
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
}
