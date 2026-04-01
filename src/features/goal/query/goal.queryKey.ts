import { queryOptions } from "@tanstack/react-query";

import { STALE_TIME } from "@/constants/staleTime";

import { goalApi } from "../api";

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
};
