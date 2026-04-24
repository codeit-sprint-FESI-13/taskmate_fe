import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { goalQueryOptions } from "@/entities/goal";
import { Spacing } from "@/shared/ui/Spacing";
import { formatNavigationKey } from "@/widgets/NavigationBar/utils/formatNavigationKey";

import { Item } from "../parts/Item";
import { List } from "../parts/List";

export const Personal = () => {
  const router = useRouter();

  const { data: goalList } = useSuspenseQuery(
    goalQueryOptions.getPersonalGoalList(),
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
          value={formatNavigationKey("personal", "goal", goal.goalId)}
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
