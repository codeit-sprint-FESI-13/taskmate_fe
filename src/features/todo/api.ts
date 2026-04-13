import { apiClient } from "@/lib/api/client";

import type {
  CreateTodoInput,
  ResponseCreateTodo,
  TodoListQueryParams,
  TodoListResponse,
  UpdateTodoInput,
} from "./types.ts";

export const todoApi = {
  create: (goalId: string, todoData: CreateTodoInput) =>
    apiClient.post<ResponseCreateTodo>(`/api/goals/${goalId}/todos`, todoData),

  getTodoList: (goalId: string, params: TodoListQueryParams) =>
    apiClient.get<TodoListResponse>(`/api/goals/${goalId}/todos`, {
      params: {
        status: "TODO",
        sort: params.sort,
        mineOnly: params.mineOnly ? "true" : "false",
        titleContains: params.titleContains,
        ...(params.cursorDueDate
          ? { cursorDueDate: params.cursorDueDate }
          : {}),
        ...(params.cursorCreatedAt
          ? { cursorCreatedAt: params.cursorCreatedAt }
          : {}),
        ...(params.cursorId !== undefined ? { cursorId: params.cursorId } : {}),
        ...(params.limit !== undefined ? { limit: params.limit } : {}),
      },
    }),

  getDoingList: (goalId: string, params: TodoListQueryParams) =>
    apiClient.get<TodoListResponse>(`/api/goals/${goalId}/todos`, {
      params: {
        status: "DOING",
        sort: params.sort,
        mineOnly: params.mineOnly ? "true" : "false",
        titleContains: params.titleContains,
        ...(params.cursorDueDate
          ? { cursorDueDate: params.cursorDueDate }
          : {}),
        ...(params.cursorCreatedAt
          ? { cursorCreatedAt: params.cursorCreatedAt }
          : {}),
        ...(params.cursorId !== undefined ? { cursorId: params.cursorId } : {}),
        ...(params.limit !== undefined ? { limit: params.limit } : {}),
      },
    }),

  getDoneList: (goalId: string, params: TodoListQueryParams) =>
    apiClient.get<TodoListResponse>(`/api/goals/${goalId}/todos`, {
      params: {
        status: "DONE",
        sort: params.sort,
        mineOnly: params.mineOnly ? "true" : "false",
        titleContains: params.titleContains,
        ...(params.cursorDueDate
          ? { cursorDueDate: params.cursorDueDate }
          : {}),
        ...(params.cursorCreatedAt
          ? { cursorCreatedAt: params.cursorCreatedAt }
          : {}),
        ...(params.cursorId !== undefined ? { cursorId: params.cursorId } : {}),
        ...(params.limit !== undefined ? { limit: params.limit } : {}),
      },
    }),

  patch: (goalId: string, todoId: string, todoData: UpdateTodoInput) => {
    return apiClient.patch(`/api/goals/${goalId}/todos/${todoId}`, todoData);
  },

  delete: (goalId: string, todoId: string) =>
    apiClient.delete<{ success: boolean }>(
      `/api/goals/${goalId}/todos/${todoId}`,
    ),
};
