"use client";

import { useMemo, useState } from "react";

import { Spacing } from "@/components/common/Spacing";
import { TodoList as TodoListUi } from "@/components/todo/List";
import { Order } from "@/components/todo/List/Order";
import { STALE_TIME } from "@/constants/staleTime";
import { todoApi } from "@/features/todo/api";
import type { TodoListQueryParams, TodoListSort } from "@/features/todo/types";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

interface DoingListProps {
  goalId: string;
  keyword: string;
  isMyTodo: boolean;
}

type TodoCursor = Pick<
  TodoListQueryParams,
  "cursorDueDate" | "cursorCreatedAt" | "cursorId"
>;

const SORT_OPTIONS: Record<string, TodoListSort> = {
  최신순: "CREATED_LATEST",
  "마감일 순": "DUE_DATE",
  오래된순: "CREATED_OLDEST",
};

export const DoingList = ({ goalId, keyword, isMyTodo }: DoingListProps) => {
  const [selectedSort, setSelectedSort] =
    useState<keyof typeof SORT_OPTIONS>("최신순");
  const sort = SORT_OPTIONS[selectedSort];

  const queryOptions = useMemo(
    () => ({
      queryKey: [
        "todo",
        goalId,
        "infinite",
        "DOING",
        { keyword, isMyTodo, sort },
      ],
      initialPageParam: {} as TodoCursor,
      queryFn: async ({ pageParam }: { pageParam: TodoCursor }) => {
        const response = await todoApi.getDoingList(goalId, {
          sort,
          mineOnly: isMyTodo,
          titleContains: keyword,
          ...pageParam,
          limit: 10,
        });
        return response.data;
      },
      getNextPageParam: (
        lastPage: Awaited<ReturnType<typeof todoApi.getDoingList>>["data"],
      ) => {
        if (!lastPage.hasNext || !lastPage.nextCursorId) return undefined;
        if (lastPage.sort === "DUE_DATE") {
          return {
            cursorDueDate: lastPage.nextCursorDueDate ?? undefined,
            cursorId: lastPage.nextCursorId,
          };
        }
        return {
          cursorCreatedAt: lastPage.nextCursorCreatedAt ?? undefined,
          cursorId: lastPage.nextCursorId,
        };
      },
      staleTime: STALE_TIME.DEFAULT,
    }),
    [goalId, isMyTodo, keyword, sort],
  );

  const { data, ref, isFetchingNextPage } = useInfiniteScroll(
    queryOptions,
    0.4,
  );
  const items = data.pages.flatMap((page) => page.items);

  return (
    <div className="h-full w-full">
      <div className="flex w-full items-center justify-between">
        <h3 className="typography-body-1 font-bold">DOING</h3>
        <Order
          options={Object.keys(SORT_OPTIONS)}
          selected={selectedSort}
          onSelect={(value) =>
            setSelectedSort(value as keyof typeof SORT_OPTIONS)
          }
        />
      </div>

      <Spacing size={20} />

      <ul className="relative h-[320px] w-full overflow-y-scroll rounded-4xl bg-white px-5 py-8">
        {items.map((todo) => (
          <TodoListUi.Item
            key={todo.id}
            todo={todo}
          />
        ))}
        <div
          ref={ref}
          className="h-1 w-full"
        />
        {isFetchingNextPage && (
          <li className="typography-body-2 px-3 py-2 text-gray-500">
            불러오는 중...
          </li>
        )}
        <Spacing size={24} />
      </ul>
    </div>
  );
};
