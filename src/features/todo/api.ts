import { apiClient } from "@/lib/api/client";

import type {
  CreateTodoInput,
  ResponseCreateTodo,
  TodoListResponse,
} from "./types.ts";

export const todoApi = {
  create: (goalId: string, todoData: CreateTodoInput) =>
    apiClient.post<ResponseCreateTodo>(`/goals/${goalId}/todos`, { todoData }),

  getList: (goalId: string) =>
    apiClient.get<TodoListResponse>(`/goals/${goalId}/todos`),
};
