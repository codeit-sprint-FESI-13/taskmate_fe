import { apiClient } from "@/shared/lib/api/client";
import type { ApiResponse } from "@/shared/lib/api/types";

import type {
  CreateTodoRequest,
  DueSoonTodoListResponse,
  RecentTodoListResponse,
  TodoInfiniteQueryParams,
  TodoListQueryParams,
  TodoListResponse,
  UpdateTodoRequest,
} from "../types/todo.types";

function todoListSearchParams(params: TodoListQueryParams) {
  const optional = Object.fromEntries(
    (
      [
        ["cursorDueDate", params.cursorDueDate],
        ["cursorCreatedAt", params.cursorCreatedAt],
        ["cursorId", params.cursorId],
        ["limit", params.limit],
      ] as const
    ).filter(([, value]) => {
      if (value === undefined) return false;
      if (typeof value === "string" && value === "") return false;
      return true;
    }),
  );

  return {
    sort: params.sort,
    mineOnly: params.mineOnly ? "true" : "false",
    titleContains: params.titleContains,
    ...optional,
  };
}

export const todoApi = {
  create: (goalId: string, todoData: CreateTodoRequest) =>
    apiClient.post<ApiResponse<null>>(`/api/goals/${goalId}/todos`, todoData),

  getTodoList: (goalId: string, params: TodoListQueryParams) =>
    apiClient.get<ApiResponse<TodoListResponse>>(`/api/goals/${goalId}/todos`, {
      params: { status: "TODO", ...todoListSearchParams(params) },
    }),

  getDoingList: (goalId: string, params: TodoListQueryParams) =>
    apiClient.get<ApiResponse<TodoListResponse>>(`/api/goals/${goalId}/todos`, {
      params: { status: "DOING", ...todoListSearchParams(params) },
    }),

  getDoneList: (goalId: string, params: TodoListQueryParams) =>
    apiClient.get<ApiResponse<TodoListResponse>>(`/api/goals/${goalId}/todos`, {
      params: { status: "DONE", ...todoListSearchParams(params) },
    }),

  patch: (goalId: string, todoId: string, todoData: UpdateTodoRequest) =>
    apiClient.patch<ApiResponse<null>>(
      `/api/goals/${goalId}/todos/${todoId}`,
      todoData,
    ),

  delete: (goalId: string, todoId: string) =>
    apiClient.delete<ApiResponse<null>>(`/api/goals/${goalId}/todos/${todoId}`),

  getRecent: (params: TodoInfiniteQueryParams = {}) =>
    apiClient.get<ApiResponse<RecentTodoListResponse>>("/api/todos/recent", {
      params,
    }),

  getDueSoon: (params: TodoInfiniteQueryParams = {}) =>
    apiClient.get<ApiResponse<DueSoonTodoListResponse>>("/api/todos/due-soon", {
      params,
    }),
};
