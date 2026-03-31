import { apiClient } from "@/lib/api/client";

import type { CreateTodoInput, ResponseCreateTood } from "./types.ts";

export const todoApi = {
  create: (goalId: string, todoData: CreateTodoInput) =>
    apiClient.post<ResponseCreateTood>(`/goals/${goalId}/todos`, { todoData }),
};
