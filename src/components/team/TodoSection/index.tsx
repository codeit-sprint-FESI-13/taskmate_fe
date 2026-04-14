"use client";

import { useState } from "react";

import AsyncBoundary from "@/components/common/AsyncBoundary";
import { Icon } from "@/components/common/Icon";
import Input from "@/components/common/Input";
import { Toggle } from "@/components/common/Toggle";
import { useGoalId } from "@/features/goal/hooks/useGoalId";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useDebouncedKeyword } from "@/hooks/useDebouncedKeyword";

import { DoingList } from "./DoingList";
import { DoneList } from "./DoneList";
import { Error as ListError } from "./state/Error";
import { Loading } from "./state/Loading";
import { TodoList } from "./TodoList";

export const TodoSection = () => {
  const goalId = useGoalId();
  const breakpoint = useBreakpoint();
  const { keywordInput, keyword, onKeywordChange } = useDebouncedKeyword();
  const [isMyTodo, setIsMyTodo] = useState(false);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="tablet:flex-row tablet:items-center tablet:justify-between tablet:gap-4 flex w-full flex-col gap-3">
        <div className="tablet:flex-1 w-full max-w-[500px] min-w-0">
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
        </div>

        <div className="tablet:w-auto flex w-full shrink-0 items-center justify-between justify-end gap-[10px]">
          <span className="text-label-1 tablet:typography-body-1 min-w-0 pr-2 text-left font-semibold text-blue-800">
            내 할일만 보기
          </span>

          <Toggle
            size={breakpoint === "desktop" ? "large" : "medium"}
            pressed={isMyTodo}
            onPressedChange={setIsMyTodo}
            className="w-[42px] shrink-0"
          />
        </div>
      </div>

      <div className="tablet:grid tablet:grid-cols-2 tablet:grid-rows-[1fr_1fr] tablet:gap-[32px] flex min-h-[480px] w-full flex-col gap-8">
        <section className="tablet:row-span-2 tablet:h-[728px] flex min-h-0 w-full flex-col">
          <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col">
            <AsyncBoundary
              loadingFallback={<Loading />}
              errorFallback={(error, onReset) => (
                <ListError
                  error={error}
                  onReset={onReset}
                />
              )}
            >
              <TodoList
                goalId={goalId}
                keyword={keyword}
                isMyTodo={isMyTodo}
              />
            </AsyncBoundary>
          </div>
        </section>
        <section className="tablet:h-full tablet:min-w-0 flex min-h-0 w-full flex-col">
          <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col">
            <AsyncBoundary
              loadingFallback={<Loading />}
              errorFallback={(error, onReset) => (
                <ListError
                  error={error}
                  onReset={onReset}
                />
              )}
            >
              <DoingList
                goalId={goalId}
                keyword={keyword}
                isMyTodo={isMyTodo}
              />
            </AsyncBoundary>
          </div>
        </section>
        <section className="tablet:h-full tablet:min-w-0 flex min-h-0 w-full flex-col">
          <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col">
            <AsyncBoundary
              loadingFallback={<Loading />}
              errorFallback={(error, onReset) => (
                <ListError
                  error={error}
                  onReset={onReset}
                />
              )}
            >
              <DoneList
                goalId={goalId}
                keyword={keyword}
                isMyTodo={isMyTodo}
              />
            </AsyncBoundary>
          </div>
        </section>
      </div>
    </div>
  );
};
