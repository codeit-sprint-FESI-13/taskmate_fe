import { apiClient } from "@/lib/api/client";

import type { ResponseCreateTeam, ResponseTeamSummary } from "./types";

export const teamApi = {
  // 팀 생성 요청
  create: (name: string) =>
    apiClient.post<ResponseCreateTeam>(`/teams`, { name }),

  getSummary: (teamId: string) =>
    apiClient.get<ResponseTeamSummary>(`/teams/${teamId}/summary`),
};
