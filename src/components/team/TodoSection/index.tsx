"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Icon } from "@/components/common/Icon";
import Input from "@/components/common/Input";
import { Toggle } from "@/components/common/Toggle";
import { useGoalId } from "@/features/goal/hooks/useGoalId";

import { DoingList } from "./DoingList";
import { DoneList } from "./DoneList";
import { TodoList } from "./TodoList";

export const TodoSection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const goalId = useGoalId();

  const todoSectionOption = {
    keyword: searchParams.get("keyword") || "",
    isMyTodo: searchParams.get("isMyTodo") === "true" ? true : false,
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("keyword", e.target.value);
    router.replace(`?${newSearchParams.toString()}`);
  };

  const handleIsMyTodoChange = (isMyTodo: boolean) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("isMyTodo", isMyTodo.toString());
    router.replace(`?${newSearchParams.toString()}`);
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full items-center justify-between">
        <Input
          placeholder="할 일을 이름으로 검색해보세요."
          onChange={handleKeywordChange}
          value={todoSectionOption.keyword}
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
            pressed={todoSectionOption.isMyTodo}
            onPressedChange={handleIsMyTodoChange}
            className="w-[42px]"
          />
        </div>
      </div>

      <div className="grid min-h-[480px] w-full grid-cols-2 grid-rows-[1fr_1fr] gap-[32px]">
        <section className="row-span-2 h-[728px] w-full">
          <TodoList
            goalId={goalId}
            keyword={todoSectionOption.keyword}
            isMyTodo={todoSectionOption.isMyTodo}
          />
        </section>
        <section>
          <DoingList
            goalId={goalId}
            keyword={todoSectionOption.keyword}
            isMyTodo={todoSectionOption.isMyTodo}
          />
        </section>
        <section>
          <DoneList
            goalId={goalId}
            keyword={todoSectionOption.keyword}
            isMyTodo={todoSectionOption.isMyTodo}
          />
        </section>
      </div>
    </div>
  );
};
