import { dueSoonApi, favoriteGoalsApi, recentApi } from "../api";

import { createPaginationOptions } from "../utils/createPaginationOptions";

export const mainInfiniteQueries = {
  favoriteGoalsInfinite: () =>
    createPaginationOptions("favoriteGoals", favoriteGoalsApi.read),
  recentInfiniteOptions: () =>
    createPaginationOptions("recent", recentApi.read),
  dueSoonInfiniteOptions: () =>
    createPaginationOptions("dueSoon", dueSoonApi.read),
};
