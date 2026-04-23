import { apiClient } from "@/shared/lib/api/client";
import type { ApiResponse } from "@/shared/lib/api/types";

import type { TeamInvitationDetail } from "../types/invitation.types";
import type {
  Member,
  MemberRole,
  TeamDetail,
  TeamListItem,
  TeamSummary,
} from "../types/team.types";

export const teamApi = {
  // 팀 목록·생성·탈퇴
  create: (name: string) =>
    apiClient.post<ApiResponse<null>>("/api/teams", { name }),

  getAll: () => apiClient.get<ApiResponse<TeamListItem[]>>("/api/teams/me"),

  getSummary: (teamId: string) =>
    apiClient.get<ApiResponse<TeamSummary>>(`/api/teams/${teamId}/summary`),

  getMemberList: (teamId: string) =>
    apiClient.get<ApiResponse<Member[]>>(`/api/teams/${teamId}/members`),

  quitTeam: (teamId: string) =>
    apiClient.delete<ApiResponse<null>>(`/api/teams/${teamId}/leave`),

  // 팀 상세·수정·삭제·멤버 관리
  getDetail: (teamId: number) =>
    apiClient.get<ApiResponse<TeamDetail>>(`/api/teams/${teamId}`),

  update: (teamId: number, name: string) =>
    apiClient.patch<ApiResponse<TeamDetail>>(`/api/teams/${teamId}`, { name }),

  deleteTeam: (teamId: number) =>
    apiClient.delete<ApiResponse<null>>(`/api/teams/${teamId}`),

  updateMemberRole: (teamId: number, memberId: number, role: MemberRole) =>
    apiClient.patch<ApiResponse<Member>>(
      `/api/teams/${teamId}/members/${memberId}/role`,
      { role },
    ),

  deleteMember: (teamId: number, memberId: number) =>
    apiClient.delete<ApiResponse<null>>(
      `/api/teams/${teamId}/members/${memberId}`,
    ),

  createInvitation: (teamId: string, email: string) =>
    apiClient.post<ApiResponse<null>>(`/api/teams/${teamId}/invitations`, {
      email,
    }),

  // 초대 수락·거절
  getInvitationByToken: (inviteToken: string) =>
    apiClient.get<ApiResponse<TeamInvitationDetail>>(
      `/api/teams/invitations/${encodeURIComponent(inviteToken)}`,
    ),

  acceptInvitation: (inviteToken: string) =>
    apiClient.post<ApiResponse<null>>(
      `/api/teams/invitations/${encodeURIComponent(inviteToken)}/accept`,
    ),

  rejectInvitation: (inviteToken: string) =>
    apiClient.post<ApiResponse<null>>(
      `/api/teams/invitations/${encodeURIComponent(inviteToken)}/reject`,
    ),
};
