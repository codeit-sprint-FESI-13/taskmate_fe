import { apiClient } from "@/lib/api/client";

import type { TeamNameResponseSuccess } from "./types";
import type { InviteResponseSuccess } from "./types";

// 팀 상세 정보 요청
export const teamDetailData = {
  read: (teamId: number) =>
    apiClient.get<TeamNameResponseSuccess>(`/teams/${teamId}`, {}),
  create: (teamId: number, name: string) =>
    apiClient.patch<TeamNameResponseSuccess>(`/teams/${teamId}`, {
      name,
    }),
};

// 팀 초대 요청
export const inviteApi = {
  create: (teamId: number, email: string) =>
    apiClient.post<InviteResponseSuccess>(`/teams/${teamId}/invitations`, {
      email,
    }),
};
