import { apiClient } from "@/lib/api/client";

import type {
  CreateTodoInput,
  ResponseCreateTodo,
  TodoListResponse,
  UpdateTodoInput,
} from "./types.ts";

export const todoApi = {
  create: (goalId: string, todoData: CreateTodoInput) =>
    apiClient.post<ResponseCreateTodo>(`/goals/${goalId}/todos`, { todoData }),

  getList: (goalId: string) =>
    apiClient.get<TodoListResponse>(`/goals/${goalId}/todos`),

  patch: (goalId: string, todoId: string, todoData: UpdateTodoInput) => {
    apiClient.patch(`/goals/${goalId}/todos/${todoId}`, { todoData });
  },

  delete: (goalId: string, todoId: string) =>
    apiClient.delete<{ success: boolean }>(`/goals/${goalId}/todos/${todoId}`),
};
