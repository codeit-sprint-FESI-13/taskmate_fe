"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Icon } from "@/components/common/Icon";
import Input from "@/components/common/Input";
import { Toggle } from "@/components/common/Toggle";
import { TodoList } from "@/components/todo/List";

export const TodoSection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

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
        <Input
          placeholder="할 일을 이름으로 검색해보세요."
          className="w-[360px]"
          onChange={handleKeywordChange}
          value={searchParams.get("keyword") || ""}
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
            pressed={searchParams.get("isMyTodo") === "true" ? true : false}
            onPressedChange={handleIsMyTodoChange}
          />
        </div>
      </div>

      <div className="grid min-h-[480px] w-full grid-cols-2 grid-rows-[1fr_1fr] gap-[32px]">
        <section className="row-span-2 h-[728px] w-full">
          <TodoList {...todoSectionOption} />
        </section>
        <section className="bg-background-normal-alternative min-h-0 rounded-4xl p-6">
          {/* @TODO: 우측 상단 패널 */}
          {/* <TodoList {...todoSectionOption} /> */}
        </section>
        <section className="bg-background-normal-alternative min-h-0 rounded-4xl p-6">
          {/* @TODO: 우측 하단 패널 */}
          {/* <TodoList {...todoSectionOption} /> */}
        </section>
      </div>
    </div>
  );
};
