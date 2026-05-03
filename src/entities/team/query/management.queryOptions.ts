import { queryOptions } from "@tanstack/react-query";

import { STALE_TIME } from "@/shared/constants/query/staleTime";

import { memberListApi, teamDetailApi } from "../api/management.api";

export const managementQueryOptions = {
  teamDetail: (teamId: number) =>
    queryOptions({
      queryKey: ["management", teamId, "detail"],
      queryFn: async () => {
        const response = await teamDetailApi.read(teamId);
        return response.data;
      },
      staleTime: STALE_TIME.DEFAULT,
    }),

  memberList: (teamId: number) =>
    queryOptions({
      queryKey: ["management", teamId, "memberList"],
      queryFn: async () => {
        const response = await memberListApi.read(teamId);
        return response.data;
      },
      staleTime: STALE_TIME.DEFAULT,
    }),
};
