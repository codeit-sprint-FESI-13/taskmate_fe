"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

import { Icon } from "@/components/common/Icon";
import Input from "@/components/common/Input";
import { Spacing } from "@/components/common/Spacing";
import { Toggle } from "@/components/common/Toggle";
import { TodoList } from "@/components/todo/List";
import { useGoalId } from "@/features/goal/hooks/useGoalId";
import { todoQueries } from "@/features/todo/query/todo.queryKey";

export const TodoSection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const goalId = useGoalId();

  const { data: todoList } = useSuspenseQuery(todoQueries.getTodoList(goalId));

  const todoStateList = todoList.filter((todo) => todo.status === "TODO");
  const doingStateList = todoList.filter((todo) => todo.status === "DOING");
  const doneStateList = todoList.filter((todo) => todo.status === "DONE");

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
    <div className="flex w-full flex-col gap-[32px]">
      <div className="flex w-full items-center justify-between">
        {/* @TODO: 검색 기능 추가 필요 */}
        <Input
          placeholder="할 일을 이름으로 검색해보세요."
          className="w-[360px]"
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

        {/* @TODO: 내 할 일만 보기 기능 추가 필요 */}
        <div className="flex items-center justify-center gap-[10px]">
          <span className="typography-body-1 font-semibold text-blue-800">
            내 할일만 보기
          </span>

          <Toggle
            pressed={todoSectionOption.isMyTodo}
            onPressedChange={handleIsMyTodoChange}
          />
        </div>
      </div>

      <div className="grid min-h-[480px] w-full grid-cols-2 grid-rows-[1fr_1fr] gap-[32px]">
        {/* @TODO: 이후 각 상태에 대한 Todo List Data req/res 처리 에 따라 추상화 방법 및 처리 필요 */}
        <section className="row-span-2 h-[728px] w-full">
          <TodoList.List
            {...todoSectionOption}
            height="728px"
            name="TODO"
          >
            {todoStateList.map((todo) => (
              <TodoList.Item
                key={todo.id}
                todo={todo}
              />
            ))}
            <Spacing size={24} />
            <TodoList.CreateButton />
          </TodoList.List>
        </section>
        <section>
          <TodoList.List
            {...todoSectionOption}
            height="320px"
            name="DOING"
          >
            {doingStateList.map((todo) => (
              <TodoList.Item
                key={todo.id}
                todo={todo}
              />
            ))}
            <Spacing size={24} />
          </TodoList.List>
        </section>
        <section>
          <TodoList.List
            {...todoSectionOption}
            height="320px"
            name="DONE"
          >
            {doneStateList.map((todo) => (
              <TodoList.Item
                key={todo.id}
                todo={todo}
              />
            ))}
            <Spacing size={24} />
          </TodoList.List>
        </section>
      </div>
    </div>
  );
};
