import { HttpResponse } from "msw";

import { apiMock } from "@/mocks/apiMock";

export const invitationsHandlers = [
  apiMock.get("*/api/teams/invitations/:inviteToken", () => {
    return HttpResponse.json({
      success: true,
      code: "SUCCESS",
      message: "팀 초대 정보 조회에 성공했습니다.",
      data: {
        invitationId: 101,
        teamId: 1,
        teamName: "TaskMate Team",
        invitedByUserId: 7,
        invitedByNickname: "팀장",
        status: "PENDING",
        expiresAt: "2026-03-27T09:00:00Z",
        expired: false,
      },
      timestamp: new Date().toISOString(),
    });
  }),

  apiMock.post("*/api/teams/invitations/:inviteToken/accept", () => {
    return HttpResponse.json({
      success: true,
      code: "SUCCESS",
      message: "팀 초대를 수락했습니다.",
      data: null,
      timestamp: new Date().toISOString(),
    });
  }),

  apiMock.post("*/api/teams/invitations/:inviteToken/reject", () => {
    return HttpResponse.json({
      success: true,
      code: "SUCCESS",
      message: "팀 초대를 거절했습니다.",
      data: null,
      timestamp: new Date().toISOString(),
    });
  }),
];
