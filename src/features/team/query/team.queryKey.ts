import { queryOptions } from "@tanstack/react-query";

import { teamApi } from "../api";

export const teamQueries = {
  summary: (teamId: string) =>
    queryOptions({
      queryKey: ["team", teamId, "summary"],
      queryFn: async () => {
        const response = await teamApi.getSummary(teamId);
        return response.data;
      },
      staleTime: 1000 * 60 * 60,
    }),
};
