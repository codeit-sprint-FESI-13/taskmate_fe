"use client";

import { useContext } from "react";

import { Line } from "@/components/common/Line";
import { Spacing } from "@/components/common/Spacing";
import { cn } from "@/utils/utils";

import AsyncBoundary from "../common/AsyncBoundary";
import { Header } from "./Header";
import { Item } from "./parts/Item";
import { List } from "./parts/List";
import { Personal } from "./Personal";
import { NavigationBarContext } from "./provider";
import { Team } from "./Team";

export const NavigationBar = () => {
  const { isOpen } = useContext(NavigationBarContext);

  return (
    <aside
      className={cn(
        "relative h-screen shrink-0 overflow-scroll rounded-tr-[48px] rounded-br-[48px] shadow-[0_0_4px_0_rgba(0,0,0,0.08)] transition-[width] duration-300 ease-in-out",
        isOpen ? "w-[360px] p-8" : "w-[60px] px-3 py-8",
      )}
      style={{ willChange: "width" }}
    >
      <Header />
      {isOpen && (
        <>
          <List.Container>
            <Item.Wrapper value="home">
              <Item.Icon name="Home" />
              <Item.Name>홈</Item.Name>
            </Item.Wrapper>
            <Item.Wrapper value="board">
              <Item.Icon name="Chat" />
              <Item.Name>게시판</Item.Name>
            </Item.Wrapper>
          </List.Container>

          <Spacing size={12} />
          <Line />
          <Spacing size={12} />

          {/* @TODO: 데이터 로딩 중 보여줄 UI 추가 */}
          <AsyncBoundary>
            <Personal />
          </AsyncBoundary>

          <Spacing size={28} />

          {/* @TODO: 데이터 로딩 중 보여줄 UI 추가 */}
          <AsyncBoundary>
            <Team />
          </AsyncBoundary>
        </>
      )}
    </aside>
  );
};
