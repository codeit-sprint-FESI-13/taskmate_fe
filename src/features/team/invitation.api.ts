import { apiClient } from "@/shared/utils/api/client";
import { ApiResponse } from "@/shared/utils/api/types";

import type { TeamInvitationDetail } from "./invitation.types";

export const teamInvitationApi = {
  getByToken: (inviteToken: string) =>
    apiClient.get<ApiResponse<TeamInvitationDetail>>(
      `/api/teams/invitations/${encodeURIComponent(inviteToken)}`,
    ),

  accept: (inviteToken: string) =>
    apiClient.post<ApiResponse<unknown>>(
      `/api/teams/invitations/${encodeURIComponent(inviteToken)}/accept`,
    ),

  reject: (inviteToken: string) =>
    apiClient.post<ApiResponse<unknown>>(
      `/api/teams/invitations/${encodeURIComponent(inviteToken)}/reject`,
    ),
};
