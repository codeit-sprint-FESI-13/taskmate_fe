import { apiClient } from "@/lib/api/client";

import type {
  CreateGoalResponse,
  CreatePersonalGoalInput,
  CreateTeamGoalInput,
  GoalListCursor,
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

  getTeamGoalList: (
    teamId: string,
    sort: SortType,
    cursor?: Partial<GoalListCursor>,
  ) => {
    if (
      cursor &&
      ((cursor.cursorCreatedAt && cursor.cursorId == null) ||
        (!cursor.cursorCreatedAt && cursor.cursorId != null))
    ) {
      throw new Error(
        "cursorCreatedAt와 cursorId는 다음 페이지 요청 시 함께 전달해야 합니다.",
      );
    }

    const params: Record<string, string | number> = { sort };
    if (cursor?.cursorCreatedAt && cursor.cursorId != null) {
      params.cursorCreatedAt = cursor.cursorCreatedAt;
      params.cursorId = cursor.cursorId;
    }

    return apiClient.get<TeamGoalListResponse>(`/api/teams/${teamId}/goals`, {
      params,
    });
  },

  toggleFavorite: (goalId: number) =>
    apiClient.post<{ success: boolean }>(`/api/goals/${goalId}/favorite`),

  getSummary: (goalId: string) =>
    apiClient.get<GoalSummaryResponse>(`/api/goals/${goalId}/summary`),
};
