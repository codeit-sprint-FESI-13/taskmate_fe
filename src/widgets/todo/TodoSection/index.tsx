"use client";

import { useState } from "react";

import { useGoalId } from "@/features/goal/hooks/useGoalId";
import { useBreakpoint } from "@/shared/hooks/useBreakpoint";
import { useDebouncedKeyword } from "@/shared/hooks/useDebouncedKeyword";
import AsyncBoundary from "@/shared/ui/AsyncBoundary";
import { Icon } from "@/shared/ui/Icon";
import Input from "@/shared/ui/Input";
import { Toggle } from "@/shared/ui/Toggle";
import { cn } from "@/shared/utils/styles/cn";

import { Error as ListError } from "./state/Error";
import { Loading } from "./state/Loading";
import { TodoColumnList } from "./TodoColumnList";

type TodoColumnSectionProps = {
  className?: string;
  children: React.ReactNode;
};

function TodoColumnSection({ className, children }: TodoColumnSectionProps) {
  return (
    <section className={cn("flex min-h-0 w-full flex-col", className)}>
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
          {children}
        </AsyncBoundary>
      </div>
    </section>
  );
}

export const TodoSection = () => {
  const goalId = useGoalId();
  const breakpoint = useBreakpoint();
  const { keywordInput, keyword, onKeywordChange } = useDebouncedKeyword();
  const [isMyTodo, setIsMyTodo] = useState(false);

  const commonProps = { goalId, keyword, isMyTodo };

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
        <TodoColumnSection className="tablet:row-span-2 tablet:h-[728px]">
          <TodoColumnList
            status="TODO"
            {...commonProps}
          />
        </TodoColumnSection>

        <TodoColumnSection className="tablet:h-full tablet:min-w-0">
          <TodoColumnList
            status="DOING"
            {...commonProps}
          />
        </TodoColumnSection>

        <TodoColumnSection className="tablet:h-full tablet:min-w-0">
          <TodoColumnList
            status="DONE"
            {...commonProps}
          />
        </TodoColumnSection>
      </div>
    </div>
  );
};
