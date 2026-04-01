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

  toggleFavorite: (goalId: number) =>
    apiClient.post<{ success: boolean }>(`/api/goals/${goalId}/favorite`),

  getSummary: (goalId: string) =>
    apiClient.get<GoalSummaryResponse>(`/api/goals/${goalId}/summary`),
};
