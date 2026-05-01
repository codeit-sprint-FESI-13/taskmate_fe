import { queryOptions } from "@tanstack/react-query";

import { STALE_TIME } from "@/shared/constants/query/staleTime";

import { progressApi } from "../api/dashboard.api";

export const dashboardQueryOptions = {
  progress: () =>
    queryOptions({
      queryKey: ["dashboard", "progress"],
      queryFn: async () => {
        const response = await progressApi.read();
        return response.data;
      },
      staleTime: STALE_TIME.DEFAULT,
    }),
};
