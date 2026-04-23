import { goalQueryOptions } from "@/entities/goal";
import { dueSoonApi, recentApi } from "@/entities/todo/api/todo.api";
import { createPaginationOptions } from "@/features/notification/utils";

export const mainInfiniteQueries = {
  favoriteGoalsInfinite: () => goalQueryOptions.getFavoriteGoalListInfinite(),
  recentInfiniteOptions: () =>
    createPaginationOptions("recent", recentApi.read),
  dueSoonInfiniteOptions: () =>
    createPaginationOptions("dueSoon", dueSoonApi.read),
};
