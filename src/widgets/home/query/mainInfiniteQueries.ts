import {
  dueSoonApi,
  favoriteGoalsApi,
  recentApi,
} from "../../../entities/todo/api/req/todo.api";
import { createPaginationOptions } from "../utils/createPaginationOptions";

export const mainInfiniteQueries = {
  favoriteGoalsInfinite: () =>
    createPaginationOptions("favoriteGoals", favoriteGoalsApi.read),
  recentInfiniteOptions: () =>
    createPaginationOptions("recent", recentApi.read),
  dueSoonInfiniteOptions: () =>
    createPaginationOptions("dueSoon", dueSoonApi.read),
};
