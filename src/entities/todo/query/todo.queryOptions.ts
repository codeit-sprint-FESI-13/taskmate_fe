import { infiniteQueryOptions } from "@tanstack/react-query";

import { STALE_TIME } from "@/shared/constants/query/staleTime";

import { todoApi } from "../api/todo.api";
import type {
  TodoListQueryParams,
  TodoListResponse,
  TodoListSort,
  TodoListStatus,
} from "../types/todo.types";

const TODO_LIST_PAGE_LIMIT = 10;

type TodoListCursor = Pick<
  TodoListQueryParams,
  "cursorDueDate" | "cursorCreatedAt" | "cursorId"
>;

export type TodoListInfiniteFilters = {
  keyword: string;
  isMyTodo: boolean;
  sort: TodoListSort;
};

function getTodoListInfiniteNextPageParam(
  lastPage: TodoListResponse,
): TodoListCursor | undefined {
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
}

function todoListInfiniteOptions(
  goalId: string,
  status: TodoListStatus,
  filters: TodoListInfiniteFilters,
  fetchPage: typeof todoApi.getTodoList,
) {
  return infiniteQueryOptions({
    queryKey: [
      "todo",
      goalId,
      "infinite",
      status,
      {
        keyword: filters.keyword,
        isMyTodo: filters.isMyTodo,
        sort: filters.sort,
      },
    ] as const,
    initialPageParam: {} as TodoListCursor,
    queryFn: async ({ pageParam }: { pageParam: TodoListCursor }) => {
      const response = await fetchPage(goalId, {
        sort: filters.sort,
        mineOnly: filters.isMyTodo,
        titleContains: filters.keyword,
        ...pageParam,
        limit: TODO_LIST_PAGE_LIMIT,
      });
      return response.data;
    },
    getNextPageParam: getTodoListInfiniteNextPageParam,
    staleTime: STALE_TIME.DEFAULT,
  });
}

export const todoQueryOptions = {
  todoListInfinite: (goalId: string, filters: TodoListInfiniteFilters) =>
    todoListInfiniteOptions(goalId, "TODO", filters, todoApi.getTodoList),

  doingListInfinite: (goalId: string, filters: TodoListInfiniteFilters) =>
    todoListInfiniteOptions(goalId, "DOING", filters, todoApi.getDoingList),

  doneListInfinite: (goalId: string, filters: TodoListInfiniteFilters) =>
    todoListInfiniteOptions(goalId, "DONE", filters, todoApi.getDoneList),
};
