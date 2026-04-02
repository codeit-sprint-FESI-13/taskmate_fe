import { queryOptions } from "@tanstack/react-query";

import { STALE_TIME } from "@/constants/staleTime";

import { teamApi } from "../api";

export const teamQueries = {
  all: () =>
    queryOptions({
      queryKey: ["teams", "all"],
      queryFn: async () => {
        const response = await teamApi.getAll();
        return response.data;
      },
      staleTime: STALE_TIME.DEFAULT,
    }),

  summary: (teamId: string) =>
    queryOptions({
      queryKey: ["team", teamId, "summary"],
      queryFn: async () => {
        const response = await teamApi.getSummary(teamId);
        return response.data;
      },
      staleTime: STALE_TIME.DEFAULT,
    }),

  memberList: (teamId: string) =>
    queryOptions({
      queryKey: ["team", teamId, "memberList"],
      queryFn: async () => {
        const response = await teamApi.getMemberList(teamId);

        return response.data;
      },
      staleTime: STALE_TIME.DEFAULT,
    }),
};
