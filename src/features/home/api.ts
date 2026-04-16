import { apiClient } from "@/lib/api/client";
import {
  DueSoonSuccessResponse,
  FavoriteGoalsQueryParams,
  InfiniteQueryParams,
  ProgressSuccessResponse,
  RecentSuccessResponse,
} from "./types";

import { FavoriteGoalsSuccessResponse } from "./types";

export const progressApi = {
  read: () => apiClient.get<ProgressSuccessResponse>("/api/main/progress"),
};

export const favoriteGoalsApi = {
  read: (params: FavoriteGoalsQueryParams = {}) =>
    apiClient.get<FavoriteGoalsSuccessResponse>("/api/main/favorite-goals", {
      params,
    }),
};

export const recentApi = {
  read: (params: InfiniteQueryParams = {}) =>
    apiClient.get<RecentSuccessResponse>("/api/todos/recent", {
      params,
    }),
};

export const dueSoonApi = {
  read: (params: InfiniteQueryParams = {}) =>
    apiClient.get<DueSoonSuccessResponse>("/api/todos/due-soon", {
      params,
    }),
};
