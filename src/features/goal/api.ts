import { apiClient } from "@/lib/api/client";

import type {
  CreateGoalResponse,
  CreatePersonalGoalInput,
  CreateTeamGoalInput,
  GoalSummaryResponse,
  PersonalGoalListResponse,
  SortType,
  TeamGoalListResponse,
} from "./types";

export const goalApi = {
  createPersonalGoal: (data: CreatePersonalGoalInput) =>
    apiClient.post<CreateGoalResponse>("/api/goals", data),

  createTeamGoal: (data: CreateTeamGoalInput) =>
    apiClient.post<CreateGoalResponse>("/api/goals", data),

  getPersonalGoalList: () =>
    apiClient.get<PersonalGoalListResponse>("/api/goals/personal"),

  getTeamGoalList: (teamId: string, sort: SortType) =>
    apiClient.get<TeamGoalListResponse>(`/api/teams/${teamId}/goals`, {
      params: { sort },
    }),

  toggleFavorite: async (goalId: number) => {
    const result = await apiClient.post<{ success: boolean }>(
      `/api/goals/${goalId}/favorite`,
    );

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("goal-favorite-toggled", { detail: { goalId } }),
      );
    }

    return result;
  },

  getSummary: (goalId: string) =>
    apiClient.get<GoalSummaryResponse>(`/api/goals/${goalId}/summary`),

  deleteGoal: (goalId: string) =>
    apiClient.delete<{
      success: boolean;
      code: string;
      message: string;
      data: null;
      timestamp: string;
    }>(`/api/goals/${goalId}`),

  updateGoal: (goalId: string, body: { name: string; dueDate: string }) =>
    apiClient.patch<{
      success: boolean;
      code: string;
      message: string;
      data: {
        id: number;
        name: string;
        dueDate: string;
      };
      timestamp: string;
    }>(`/api/goals/${goalId}`, body),
};
