import { favoriteGoalsApi } from "@/entities/goal/api/req/goal.api";
import { dueSoonApi, recentApi } from "@/entities/todo/api/req/todo.api";
import { createPaginationOptions } from "@/features/notification/utils";

export const mainInfiniteQueries = {
  favoriteGoalsInfinite: () =>
    createPaginationOptions("favoriteGoals", favoriteGoalsApi.read),
  recentInfiniteOptions: () =>
    createPaginationOptions("recent", recentApi.read),
  dueSoonInfiniteOptions: () =>
    createPaginationOptions("dueSoon", dueSoonApi.read),
};
