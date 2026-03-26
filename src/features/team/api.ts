import { apiClient } from "@/lib/api/client";

import type { ResponseCreateTeam } from "./types";

export const teamApi = {
  // 팀 생성 요청
  create: (name: string) =>
    apiClient.post<ResponseCreateTeam>(`/teams`, { name }),
};
