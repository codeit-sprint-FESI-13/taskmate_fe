import { STALE_TIME } from "@/shared/constants/query/staleTime";

import { todoApi } from "../api/api";
import type {
  TodoListQueryParams,
  TodoListResponse,
  TodoListSort,
  TodoListStatus,
} from "../types/types";

const TODO_LIST_PAGE_LIMIT = 10;

type TodoCursor = Pick<
  TodoListQueryParams,
  "cursorDueDate" | "cursorCreatedAt" | "cursorId"
>;

export type TodoListInfiniteFilters = {
  keyword: string;
  isMyTodo: boolean;
  sort: TodoListSort;
};

function getTodoListInfiniteNextPageParam(
  lastPage: TodoListResponse["data"],
): TodoCursor | undefined {
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
  fetchPage: (
    goalId: string,
    params: TodoListQueryParams,
  ) => ReturnType<(typeof todoApi)["getTodoList"]>,
) {
  return {
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
    initialPageParam: {} as TodoCursor,
    queryFn: async ({ pageParam }: { pageParam: TodoCursor }) => {
      const response = await fetchPage(goalId, {
        sort: filters.sort,
        mineOnly: filters.isMyTodo,
        titleContains: filters.keyword,
        ...pageParam,
        limit: TODO_LIST_PAGE_LIMIT,
      });
      return response.data;
    },
    getNextPageParam: (lastPage: TodoListResponse["data"]) =>
      getTodoListInfiniteNextPageParam(lastPage),
    staleTime: STALE_TIME.DEFAULT,
  };
}

export const todoQueries = {
  todoListInfinite: (goalId: string, filters: TodoListInfiniteFilters) =>
    todoListInfiniteOptions(goalId, "TODO", filters, todoApi.getTodoList),

  doingListInfinite: (goalId: string, filters: TodoListInfiniteFilters) =>
    todoListInfiniteOptions(goalId, "DOING", filters, todoApi.getDoingList),

  doneListInfinite: (goalId: string, filters: TodoListInfiniteFilters) =>
    todoListInfiniteOptions(goalId, "DONE", filters, todoApi.getDoneList),
};
