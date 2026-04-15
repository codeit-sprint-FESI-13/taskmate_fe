import { apiClient } from "@/lib/api/client";

import { FavoriteGoalsQueryParams, ProgressSuccessResponse } from "./types";
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
