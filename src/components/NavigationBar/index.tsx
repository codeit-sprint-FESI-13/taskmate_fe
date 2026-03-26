"use client";

import { useContext } from "react";

import { Icon } from "@/components/common/Icon";
import { Line } from "@/components/common/Line";
import { Spacing } from "@/components/common/Spacing";
import { cn } from "@/utils/utils";

import { Item } from "./Item";
import { List } from "./List";
import { NavigationBarContext } from "./provider";
import { Team } from "./Team";

export const NavigationBar = () => {
  const { isOpen, open, close } = useContext(NavigationBarContext);

  return (
    <aside
      className={cn(
        "relative h-screen overflow-scroll rounded-tr-[48px] rounded-br-[48px] shadow-[0_0_4px_0_rgba(0,0,0,0.08)] transition-[width] duration-300 ease-in-out",
        isOpen ? "w-[360px] p-8" : "w-[60px] px-3 py-8",
      )}
      style={{ willChange: "width" }}
    >
      <header
        className={cn(
          "flex flex-col items-center justify-start transition-[gap] duration-300 ease-in-out",
          isOpen ? "gap-[10px]" : "gap-10",
        )}
      >
        <Icon
          name={isOpen ? "LeftDouble" : "RightDouble"}
          size={24}
          className={cn(
            "cursor-pointer text-gray-300",
            isOpen ? "self-end" : "self-center",
          )}
          onClick={isOpen ? close : open}
        />

        <h1 className="typography-body-2 flex h-[40px] items-center py-[10px] font-bold">
          LOGO
        </h1>
      </header>

      {isOpen && (
        <>
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
            </Team.List>

            <Spacing size={10} />

            <Team.Container>
              <Team.Title>팀 2</Team.Title>
            </Team.Container>
          </List.Container>
        </>
      )}
    </aside>
  );
};
