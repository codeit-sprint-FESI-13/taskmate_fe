import { apiClient } from "@/shared/utils/api/client";

import type {
  ResponseCreateTeam,
  ResponseMemberList,
  ResponseQuitTeam,
  ResponseTeamList,
  ResponseTeamSummary,
} from "../../types/types";

export const teamApi = {
  // 팀 생성 요청
  create: (name: string) =>
    apiClient.post<ResponseCreateTeam>(`/api/teams`, { name }),

  getSummary: (teamId: string) =>
    apiClient.get<ResponseTeamSummary>(`/api/teams/${teamId}/summary`),

  getMemberList: (teamId: string) =>
    apiClient.get<ResponseMemberList>(`/api/teams/${teamId}/members`),

  quitTeam: (teamId: string) =>
    apiClient.delete<ResponseQuitTeam>(`/api/teams/${teamId}/leave`),

  getAll: () => apiClient.get<ResponseTeamList>(`/api/teams/me`),
};
