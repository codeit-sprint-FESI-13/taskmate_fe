import { queryOptions } from "@tanstack/react-query";

import { STALE_TIME } from "@/constants/staleTime";

import { goalApi } from "../api";
import { SortType } from "../types";

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
