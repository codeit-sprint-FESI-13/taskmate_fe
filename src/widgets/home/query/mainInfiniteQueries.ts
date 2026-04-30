import { goalQueryOptions } from "@/entities/goal";
import { todoApi } from "@/entities/todo";
import { createPaginationOptions } from "@/shared/utils/createPaginationOptions";

export const mainInfiniteQueries = {
  favoriteGoalsInfinite: () => goalQueryOptions.getFavoriteGoalListInfinite(),
  recentInfiniteOptions: () =>
    createPaginationOptions("recent", todoApi.getRecent),
  dueSoonInfiniteOptions: () =>
    createPaginationOptions("dueSoon", todoApi.getDueSoon),
};
