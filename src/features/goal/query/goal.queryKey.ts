import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import { STALE_TIME } from "@/shared/constants/query/staleTime";

import { goalApi } from "../api";
import { GoalListCursor, SortType } from "../types";

export const goalQueries = {
  getPersonalGoalList: () =>
    queryOptions({
      queryKey: ["personal", "goals"],
      queryFn: async () => {
        const response = await goalApi.getPersonalGoalList();
        return response.data;
      },
      staleTime: STALE_TIME.DEFAULT,
    }),

  getTeamGoalList: (teamId: string, sort: SortType = "LATEST") =>
    queryOptions({
      queryKey: ["team", teamId, "goals", sort],
      queryFn: async () => {
        const response = await goalApi.getTeamGoalList(teamId, sort);
        return response.data;
      },
      staleTime: STALE_TIME.DEFAULT,
    }),

  getTeamGoalListInfinite: (teamId: string, sort: SortType = "LATEST") =>
    infiniteQueryOptions({
      queryKey: ["team", teamId, "goals", "infinite", sort],
      queryFn: async ({ pageParam }) => {
        const response = await goalApi.getTeamGoalList(
          teamId,
          sort,
          pageParam ?? undefined,
        );
        return response.data;
      },
      initialPageParam: null as GoalListCursor | null,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      staleTime: STALE_TIME.DEFAULT,
    }),

  getSummary: (goalId: string) =>
    queryOptions({
      queryKey: ["goal", goalId, "summary"],
      queryFn: async () => {
        const response = await goalApi.getSummary(goalId);
        return response.data;
      },
      staleTime: STALE_TIME.DEFAULT,
    }),
};
