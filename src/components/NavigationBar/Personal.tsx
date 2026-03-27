import { Spacing } from "../common/Spacing";
import { Item } from "./parts/Item";
import { List } from "./parts/List";

// @TODO: API 연동 후 수정
export const Personal = () => {
  return (
    <List.Container>
      <List.Header>
        <List.Title>개인 스페이스</List.Title>
      </List.Header>
      <Spacing size={10} />
      <Item.Wrapper value="personal-1">
        <Item.Icon name="Paper" />
        <Item.Name>공부</Item.Name>
      </Item.Wrapper>
      <Item.Wrapper value="personal-2">
        <Item.Icon name="Paper" />
        <Item.Name>운동</Item.Name>
      </Item.Wrapper>
      <Item.Wrapper value="personal-3">
        <Item.Icon name="Paper" />
        <Item.Name>개인 일정</Item.Name>
      </Item.Wrapper>

      <Spacing size={10} />
      <List.GoalCreateButton />
    </List.Container>
  );
};
