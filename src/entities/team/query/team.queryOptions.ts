import { queryOptions } from "@tanstack/react-query";

import { STALE_TIME } from "@/shared/constants/query/staleTime";

import { teamApi } from "../api/team.api";

export const teamQueryOptions = {
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

  invitation: (token: string) =>
    queryOptions({
      queryKey: ["teamInvitation", token],
      queryFn: async () => {
        const res = await teamApi.getInvitationByToken(token);
        return res.data;
      },
      enabled: Boolean(token),
    }),
};
