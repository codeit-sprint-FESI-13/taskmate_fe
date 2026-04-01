import { apiClient } from "@/lib/api/client";

import type {
  ResponseCreateTeam,
  ResponseMemberList,
  ResponseQuitTeam,
  ResponseTeamList,
  ResponseTeamSummary,
} from "./types";

export const teamApi = {
  // 팀 생성 요청
  create: (name: string) =>
    apiClient.post<ResponseCreateTeam>(`/teams`, { name }),

  getSummary: (teamId: string) =>
    apiClient.get<ResponseTeamSummary>(`/teams/${teamId}/summary`),

  getMemberList: (teamId: string) =>
    apiClient.get<ResponseMemberList>(`/teams/${teamId}/members`),

  quitTeam: (teamId: string) =>
    apiClient.delete<ResponseQuitTeam>(`/teams/${teamId}/leave`),

  getAll: () => apiClient.get<ResponseTeamList>(`/teams/me`),
};
