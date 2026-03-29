import { apiClient } from "@/lib/api/client";

import type { ResponseInviteSuccess } from "./types";

export const inviteApi = {
  // 팀 초대 요청
  create: (teamId: string, email: string) =>
    apiClient.post<ResponseInviteSuccess>(`/teams/${teamId}/invitations`, {
      email,
    }),
};
