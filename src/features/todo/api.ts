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
      },
    }),

  getDoingList: (goalId: string, params: TodoListQueryParams) =>
    apiClient.get<TodoListResponse>(`/api/goals/${goalId}/todos`, {
      params: {
        status: "DOING",
        sort: params.sort,
        mineOnly: params.mineOnly ? "true" : "false",
        titleContains: params.titleContains,
      },
    }),

  getDoneList: (goalId: string, params: TodoListQueryParams) =>
    apiClient.get<TodoListResponse>(`/api/goals/${goalId}/todos`, {
      params: {
        status: "DONE",
        sort: params.sort,
        mineOnly: params.mineOnly ? "true" : "false",
        titleContains: params.titleContains,
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
