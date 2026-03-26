import { Spacing } from "../common/Spacing";
import { Item } from "./parts/Item";
import { List } from "./parts/List";
import { Team as TeamComponent } from "./parts/Team";

export const Team = () => {
  return (
    <List.Container>
      <List.Header>
        <List.Title>팀 스페이스</List.Title>
        <List.TeamAddIcon />
      </List.Header>
      <Spacing size={10} />

      <TeamComponent.Container>
        <TeamComponent.Title>팀 1</TeamComponent.Title>
      </TeamComponent.Container>
      <TeamComponent.List>
        <Item.Wrapper>
          <Item.Icon name="Paper" />
          <Item.Name>공부</Item.Name>
          <Item.Label>5</Item.Label>
        </Item.Wrapper>
        <Item.Wrapper>
          <Item.Icon name="Paper" />
          <Item.Name>운동</Item.Name>
          <Item.Label>5</Item.Label>
        </Item.Wrapper>
        <Item.Wrapper>
          <Item.Icon name="Paper" />
          <Item.Name>개인 일정</Item.Name>
        </Item.Wrapper>

        <Spacing size={10} />
        <List.GoalCreateButton />
      </TeamComponent.List>
    </List.Container>
  );
};
