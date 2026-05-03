import { queryOptions } from "@tanstack/react-query";

import { teamInvitationApi } from "@/entities/team/api/invitation.api";

export const invitationQueryKey = (token: string) =>
  ["teamInvitation", token] as const;

export const invitationQueries = (token: string) =>
  queryOptions({
    queryKey: invitationQueryKey(token),
    queryFn: async () => {
      const res = await teamInvitationApi.getByToken(token);
      return res.data;
    },
    enabled: Boolean(token),
  });
