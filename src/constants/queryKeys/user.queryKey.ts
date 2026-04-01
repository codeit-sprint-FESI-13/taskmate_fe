import { queryOptions } from "@tanstack/react-query";

import { getMyInfo } from "@/features/auth/myInfo/api/myInfo.api";

import { STALE_TIME } from "../staleTime";

export const userQueries = {
  all: ["auth"] as const,

  myInfo: () =>
    queryOptions({
      queryKey: [...userQueries.all, "myInfo"] as const,
      queryFn: getMyInfo,
      staleTime: STALE_TIME.LONG,
    }),
};
