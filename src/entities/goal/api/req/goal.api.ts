import { apiClient } from "@/shared/utils/api/client";

import {
  FavoriteGoalsQueryParams,
  ProgressSuccessResponse,
} from "../../../../widgets/home/types";
import { FavoriteGoalsSuccessResponse } from "../../../../widgets/home/types";

export const progressApi = {
  read: () => apiClient.get<ProgressSuccessResponse>("/api/main/progress"),
};

export const favoriteGoalsApi = {
  read: (params: FavoriteGoalsQueryParams = {}) =>
    apiClient.get<FavoriteGoalsSuccessResponse>("/api/main/favorite-goals", {
      params,
    }),
};
