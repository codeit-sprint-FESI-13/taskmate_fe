import { apiClient } from "@/shared/lib/api/client";

import { FavoriteGoalsSuccessResponse } from "../types/favorite.types";
import { FavoriteGoalsQueryParams } from "../types/favorite.types";

export const favoriteGoalsApi = {
  read: (params: FavoriteGoalsQueryParams = {}) =>
    apiClient.get<FavoriteGoalsSuccessResponse>("/api/main/favorite-goals", {
      params,
    }),
};
