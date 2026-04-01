"use client";

import { useState } from "react";

import { Spacing } from "@/components/common/Spacing";

import { CreateButton } from "./CreateButton";
import { Item } from "./Item";
import { Order } from "./Order";

interface ListProps {
  keyword: string;
  isMyTodo: boolean;
  name: string;
  children: React.ReactNode;
  height: string;
}

const ListComponent = ({
  keyword: _keyword,
  isMyTodo: _isMyTodo,
  name,
  children,
  height,
}: ListProps) => {
  // @TODO: 정렬 옵션 백엔드 추가 필요
  const sortOptions = ["최신순", "마감일 순"];
  const [selectedSort, setSelectedSort] = useState("최신순");

  return (
    <div className="h-full w-full">
      <div className="flex w-full items-center justify-between">
        <h3 className="typography-body-1 font-bold">{name}</h3>
        <Order
          options={sortOptions}
          selected={selectedSort}
          onSelect={setSelectedSort}
        />
      </div>

      <Spacing size={20} />

      <ul
        style={{ height }}
        className="relative w-full overflow-y-scroll rounded-4xl bg-white px-5 py-8"
      >
        {children}
      </ul>
    </div>
  );
};

export const TodoList = {
  Item,
  CreateButton,
  List: ListComponent,
};
