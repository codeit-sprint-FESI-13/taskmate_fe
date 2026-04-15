import { favoriteGoalsApi } from "../api";
import { createPaginationOptions } from "../utils/createPaginationOptions";

export const mainInfiniteQueries = {
  favoriteGoalsInfinite: () =>
    createPaginationOptions("favoriteGoals", favoriteGoalsApi.read),
};
