import { apiClient } from "@/shared/utils/api/client.js";

import type {
  CreateTodoInput,
  ResponseCreateTodo,
  TodoListQueryParams,
  TodoListResponse,
  UpdateTodoInput,
} from "./types.ts";

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
  create: (goalId: string, todoData: CreateTodoInput) =>
    apiClient.post<ResponseCreateTodo>(`/api/goals/${goalId}/todos`, todoData),

  getTodoList: (goalId: string, params: TodoListQueryParams) =>
    apiClient.get<TodoListResponse>(`/api/goals/${goalId}/todos`, {
      params: { status: "TODO", ...todoListSearchParams(params) },
    }),

  getDoingList: (goalId: string, params: TodoListQueryParams) =>
    apiClient.get<TodoListResponse>(`/api/goals/${goalId}/todos`, {
      params: { status: "DOING", ...todoListSearchParams(params) },
    }),

  getDoneList: (goalId: string, params: TodoListQueryParams) =>
    apiClient.get<TodoListResponse>(`/api/goals/${goalId}/todos`, {
      params: { status: "DONE", ...todoListSearchParams(params) },
    }),

  patch: (goalId: string, todoId: string, todoData: UpdateTodoInput) => {
    return apiClient.patch(`/api/goals/${goalId}/todos/${todoId}`, todoData);
  },

  delete: (goalId: string, todoId: string) =>
    apiClient.delete<{ success: boolean }>(
      `/api/goals/${goalId}/todos/${todoId}`,
    ),
};
