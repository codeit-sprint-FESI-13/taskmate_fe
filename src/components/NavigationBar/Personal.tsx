import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { goalQueries } from "@/features/goal/query/goal.queryKey";

import { Spacing } from "../common/Spacing";
import { Item } from "./parts/Item";
import { List } from "./parts/List";

export const Personal = () => {
  const router = useRouter();
  const { data: goalList } = useSuspenseQuery(
    goalQueries.getPersonalGoalList(),
  );

  return (
    <List.Container>
      <List.Header>
        <List.Title>개인 스페이스</List.Title>
      </List.Header>
      <Spacing size={10} />
      {goalList.map((goal) => (
        <Item.Wrapper
          key={goal.goalId}
          value={`personal-${goal.goalId}`}
          onClick={() => {
            router.push(`/taskmate/personal/goal/${goal.goalId}`);
          }}
        >
          <Item.Icon name="Paper" />
          <Item.Name>{goal.goalName}</Item.Name>
        </Item.Wrapper>
      ))}

      <Spacing size={10} />
      <List.GoalCreateButton />
    </List.Container>
  );
};
