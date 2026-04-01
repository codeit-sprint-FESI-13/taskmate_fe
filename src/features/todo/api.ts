import { apiClient } from "@/lib/api/client";

import type {
  CreateTodoInput,
  ResponseCreateTodo,
  TodoListResponse,
  UpdateTodoInput,
} from "./types.ts";

export const todoApi = {
  create: (goalId: string, todoData: CreateTodoInput) =>
    apiClient.post<ResponseCreateTodo>(`/api/goals/${goalId}/todos`, {
      todoData,
    }),

  getList: (goalId: string) =>
    apiClient.get<TodoListResponse>(`/api/goals/${goalId}/todos`),

  patch: (goalId: string, todoId: string, todoData: UpdateTodoInput) => {
    apiClient.patch(`/api/goals/${goalId}/todos/${todoId}`, { todoData });
  },

  delete: (goalId: string, todoId: string) =>
    apiClient.delete<{ success: boolean }>(
      `/api/goals/${goalId}/todos/${todoId}`,
    ),
};
