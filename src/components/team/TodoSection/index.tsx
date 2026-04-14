"use client";

import { useState } from "react";

import { Icon } from "@/components/common/Icon";
import Input from "@/components/common/Input";
import { Toggle } from "@/components/common/Toggle";
import { useGoalId } from "@/features/goal/hooks/useGoalId";

import { DoingList } from "./DoingList";
import { DoneList } from "./DoneList";
import { TodoList } from "./TodoList";
import { useDebouncedKeyword } from "./useDebouncedKeyword";

export const TodoSection = () => {
  const goalId = useGoalId();
  const { keywordInput, keyword, onKeywordChange } = useDebouncedKeyword();
  const [isMyTodo, setIsMyTodo] = useState(false);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full items-center justify-between">
        <Input
          placeholder="할 일을 이름으로 검색해보세요."
          onChange={onKeywordChange}
          value={keywordInput}
          rightIcon={
            <div>
              <Icon
                name="Search"
                size={24}
                className="text-gray-300"
              />
            </div>
          }
        />

        <div className="flex items-center justify-center gap-[10px]">
          <span className="typography-body-1 font-semibold text-blue-800">
            내 할일만 보기
          </span>

          <Toggle
            pressed={isMyTodo}
            onPressedChange={setIsMyTodo}
            className="w-[42px]"
          />
        </div>
      </div>

      <div className="grid min-h-[480px] w-full grid-cols-2 grid-rows-[1fr_1fr] gap-[32px]">
        <section className="row-span-2 h-[728px] w-full">
          <TodoList
            goalId={goalId}
            keyword={keyword}
            isMyTodo={isMyTodo}
          />
        </section>
        <section>
          <DoingList
            goalId={goalId}
            keyword={keyword}
            isMyTodo={isMyTodo}
          />
        </section>
        <section>
          <DoneList
            goalId={goalId}
            keyword={keyword}
            isMyTodo={isMyTodo}
          />
        </section>
      </div>
    </div>
  );
};
