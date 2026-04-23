import { apiClient } from "@/shared/lib/api/client";
import { ApiResponse } from "@/shared/lib/api/types";

import {
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
  createPersonalGoal: (data: CreatePersonalGoalRequest) =>
    apiClient.post<ApiResponse<CreateGoalResponse>>("/api/goals", data),

  createTeamGoal: (data: CreateTeamGoalRequest) =>
    apiClient.post<ApiResponse<CreateGoalResponse>>("/api/goals", data),

  getPersonalGoalList: () =>
    apiClient.get<ApiResponse<PersonalGoalListResponse>>("/api/goals/personal"),

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

    return apiClient.get<ApiResponse<TeamGoalListResponse>>(
      `/api/teams/${teamId}/goals`,
      {
        params,
      },
    );
  },

  toggleFavorite: (goalId: number) =>
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
      {
        params,
      },
    ),
};
