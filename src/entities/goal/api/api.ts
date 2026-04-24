import { apiClient } from "@/shared/lib/api/client";
import { ApiResponse } from "@/shared/lib/api/types";

import type {
  FavoriteGoalsQueryParams,
  FavoriteGoalsSuccessResponse,
} from "../types/favorite.types";
import type {
  CreateGoalResponse,
  CreatePersonalGoalRequest,
  CreateTeamGoalRequest,
  DeleteGoalResponse,
  GoalSummaryResponse,
  ToggleGoalFavoriteResponse,
  UpdateGoalRequest,
  UpdateGoalResponse,
} from "../types/goal.types";
import type {
  GoalListCursor,
  PersonalGoalListResponse,
  SortType,
  TeamGoalListResponse,
} from "../types/goalList.types";

export const goalApi = {
  createGoal: (data: CreatePersonalGoalRequest | CreateTeamGoalRequest) =>
    apiClient.post<ApiResponse<CreateGoalResponse>>("/api/goals", data),

  getPersonalGoalList: () =>
    apiClient.get<ApiResponse<PersonalGoalListResponse>>("/api/goals/personal"),

  getTeamGoalList: (
    teamId: string,
    sort: SortType,
    cursor?: Partial<GoalListCursor>,
  ) => {
    const params: Record<string, string | number> = { sort };
    if (cursor?.cursorCreatedAt && cursor.cursorId != null) {
      params.cursorCreatedAt = cursor.cursorCreatedAt;
      params.cursorId = cursor.cursorId;
    }

    return apiClient.get<ApiResponse<TeamGoalListResponse>>(
      `/api/teams/${teamId}/goals`,
      { params },
    );
  },

  toggleFavorite: (goalId: string) =>
    apiClient.post<ApiResponse<ToggleGoalFavoriteResponse>>(
      `/api/goals/${goalId}/favorite`,
    ),

  getSummary: (goalId: string) =>
    apiClient.get<ApiResponse<GoalSummaryResponse>>(
      `/api/goals/${goalId}/summary`,
    ),

  deleteGoal: (goalId: string) =>
    apiClient.delete<ApiResponse<DeleteGoalResponse>>(`/api/goals/${goalId}`),

  updateGoal: (goalId: string, body: UpdateGoalRequest) =>
    apiClient.patch<ApiResponse<UpdateGoalResponse>>(
      `/api/goals/${goalId}`,
      body,
    ),

  getFavoriteGoalList: (params: FavoriteGoalsQueryParams = {}) =>
    apiClient.get<ApiResponse<FavoriteGoalsSuccessResponse>>(
      "/api/main/favorite-goals",
      { params },
    ),
};
