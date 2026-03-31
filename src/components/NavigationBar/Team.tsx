"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { teamQueries } from "@/features/team/query/team.queryKey";

import { Spacing } from "../common/Spacing";
import { Item } from "./parts/Item";
import { List } from "./parts/List";
import { Team as TeamComponent } from "./parts/Team";

export const Team = () => {
  const { data: teamList } = useSuspenseQuery(teamQueries.all());

  return (
    <List.Container>
      <List.Header>
        <List.Title>팀 스페이스</List.Title>
        <List.TeamAddIcon />
      </List.Header>
      <Spacing size={10} />

      {teamList.map((team, index) => {
        return (
          <>
            <TeamComponent.Container
              key={team.teamId}
              value={`team-${team.teamId}`}
            >
              <TeamComponent.Title>{team.teamName}</TeamComponent.Title>
              <TeamComponent.List>
                {team.goals.map((goal) => {
                  return (
                    <Item.Wrapper
                      key={goal.goalId}
                      value={`team-${team.teamId}-${goal.goalId}`}
                    >
                      <Item.Icon name="Paper" />
                      <Item.Name>{goal.goalName}</Item.Name>
                    </Item.Wrapper>
                  );
                })}

                <Spacing size={10} />
                <List.GoalCreateButton teamId={team.teamId} />
              </TeamComponent.List>
            </TeamComponent.Container>
            {index !== teamList.length - 1 && <Spacing size={10} />}
          </>
        );
      })}
    </List.Container>
  );
};
