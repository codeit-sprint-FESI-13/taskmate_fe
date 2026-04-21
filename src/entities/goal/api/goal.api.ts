import { apiClient } from "@/shared/utils/api/client";
import { ProgressSuccessResponse } from "@/widgets/home/types";

import { FavoriteGoalsSuccessResponse } from "../types/favorite.types";
import { FavoriteGoalsQueryParams } from "../types/favorite.types";

export const progressApi = {
  read: () => apiClient.get<ProgressSuccessResponse>("/api/main/progress"),
};

export const favoriteGoalsApi = {
  read: (params: FavoriteGoalsQueryParams = {}) =>
    apiClient.get<FavoriteGoalsSuccessResponse>("/api/main/favorite-goals", {
      params,
    }),
};
