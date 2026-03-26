import { Icon } from "@/components/common/Icon";
import { Line } from "@/components/common/Line";

import { Spacing } from "../common/Spacing";
import { Item } from "./Item";
import { List } from "./List";
import { Team } from "./Team";

export const NavigationBar = () => {
  return (
    <aside className="relative h-screen w-[360px] overflow-scroll rounded-tr-[48px] rounded-br-[48px] p-8 shadow-[0_0_4px_0_rgba(0,0,0,0.08)]">
      <header className="flex flex-col items-center justify-start gap-[10px]">
        <Icon
          name="LeftDouble"
          size={24}
          className="self-end text-gray-300"
        />
        <h1 className="typography-body-2 flex h-[40px] items-center py-[10px] font-bold">
          LOGO
        </h1>
      </header>

      <List.Container>
        <Item.Wrapper>
          <Item.Icon name="Home" />
          <Item.Name>홈</Item.Name>
        </Item.Wrapper>
        <Item.Wrapper>
          <Item.Icon name="Chat" />
          <Item.Name>게시판</Item.Name>
        </Item.Wrapper>
      </List.Container>
      <Spacing size={12} />
      <Line />
      <Spacing size={12} />

      <List.Container>
        <List.Header>
          <List.Title>개인 스페이스</List.Title>
        </List.Header>
        <Spacing size={10} />
        <Item.Wrapper>
          <Item.Icon name="Paper" />
          <Item.Name>공부</Item.Name>
        </Item.Wrapper>
        <Item.Wrapper>
          <Item.Icon name="Paper" />
          <Item.Name>운동</Item.Name>
        </Item.Wrapper>
        <Item.Wrapper>
          <Item.Icon name="Paper" />
          <Item.Name>개인 일정</Item.Name>
        </Item.Wrapper>

        <Spacing size={10} />
        <List.GoalCreateButton />
      </List.Container>

      <Spacing size={28} />

      <List.Container>
        <List.Header>
          <List.Title>팀 스페이스</List.Title>
          <List.TeamAddIcon />
        </List.Header>
        <Spacing size={10} />

        <Team.Container>
          <Team.Title>팀 1</Team.Title>
        </Team.Container>
        <Team.List>
          <Item.Wrapper>
            <Item.Icon name="Paper" />
            <Item.Name>공부</Item.Name>
          </Item.Wrapper>
          <Item.Wrapper>
            <Item.Icon name="Paper" />
            <Item.Name>운동</Item.Name>
          </Item.Wrapper>
          <Item.Wrapper>
            <Item.Icon name="Paper" />
            <Item.Name>개인 일정</Item.Name>
          </Item.Wrapper>

          <Spacing size={10} />
          <List.GoalCreateButton />
        </Team.List>

        <Spacing size={10} />

        <Team.Container>
          <Team.Title>팀 2</Team.Title>
        </Team.Container>
      </List.Container>
    </aside>
  );
};
