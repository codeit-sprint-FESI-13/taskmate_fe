import { apiClient } from "@/lib/api/client";

import type {
  CreateGoalResponse,
  CreatePersonalGoalInput,
  CreateTeamGoalInput,
  PersonalGoalListResponse,
  SortType,
  TeamGoalListResponse,
} from "./types";

export const goalApi = {
  createPersonalGoal: (data: CreatePersonalGoalInput) =>
    apiClient.post<CreateGoalResponse>("/goals", data),

  createTeamGoal: (data: CreateTeamGoalInput) =>
    apiClient.post<CreateGoalResponse>("/goals", data),

  getPersonalGoalList: () =>
    apiClient.get<PersonalGoalListResponse>("/goals/personal"),

  getTeamGoalList: (teamId: string, sort: SortType) =>
    apiClient.get<TeamGoalListResponse>(`/teams/${teamId}/goals`, {
      params: { sort },
    }),

  toggleFavorite: (goalId: number) =>
    apiClient.post<{ success: boolean }>(`/goals/${goalId}/favorite`),
};
