import { apiClient } from "@/shared/lib/api/client";

import type { TeamDeleteResponseSuccess } from "../types/management.types";
import type { MemberDeleteSuccessResponse } from "../types/management.types";
import type {
  MemberRole,
  MemberRoleUpdateSuccessResponse,
} from "../types/management.types";
import type { MemberListResponseSuccess } from "../types/management.types";
import type { InviteResponseSuccess } from "../types/management.types";
import type { TeamResponseSuccess } from "../types/management.types";

// 팀 상세 정보 요청
// get / patch / delete
export const teamDetailApi = {
  read: (teamId: number) =>
    apiClient.get<TeamResponseSuccess>(`/api/teams/${teamId}`, {}),
  create: (teamId: number, name: string) =>
    apiClient.patch<TeamResponseSuccess>(`/api/teams/${teamId}`, {
      name,
    }),
  delete: (teamId: number) =>
    apiClient.delete<TeamDeleteResponseSuccess>(`/api/teams/${teamId}`, {}),
};

// 멤버 목록 상세 조회
export const memberListApi = {
  read: (teamId: number) =>
    apiClient.get<MemberListResponseSuccess>(
      `/api/teams/${teamId}/members`,
      {},
    ),
};

// 멤버 권한 변경
export const memberRoleApi = {
  update: (teamId: number, memberId: number, role: MemberRole) =>
    apiClient.patch<MemberRoleUpdateSuccessResponse>(
      `/api/teams/${teamId}/members/${memberId}/role`,
      { role },
    ),
};

// 팀 삭제
export const memberApi = {
  delete: (teamId: number, teamMemberId: number) =>
    apiClient.delete<MemberDeleteSuccessResponse>(
      `/api/teams/${teamId}/members/${teamMemberId}`,
    ),
};

// 팀 초대 요청
export const inviteApi = {
  create: (teamId: string, email: string) =>
    apiClient.post<InviteResponseSuccess>(`/api/teams/${teamId}/invitations`, {
      email,
    }),
};
