import { HttpResponse } from "msw";

import { apiMock } from "@/mocks/apiMock";

const now = "2026-04-02T00:00:00Z";

const teamDetail = {
  id: 1,
  name: "TaskMate Team",
  createdBy: 101,
  createdAt: now,
  updatedAt: now,
};

const members = [
  {
    id: 1,
    userId: 101,
    profileImageUrl: "",
    userEmail: "leader@example.com",
    userNickname: "나 팀장!",
    role: "ADMIN",
    joinedAt: now,
  },
  {
    id: 2,
    userId: 102,
    profileImageUrl: "",
    userEmail: "member1@example.com",
    userNickname: "팀원1",
    role: "MEMBER",
    joinedAt: now,
  },
];

export const managementHandler = [
  // 팀 상세 조회
  apiMock.get("/api/teams/:teamId", ({ params }) => {
    const teamId = Number(params.teamId);

    if (teamId === 401) {
      return HttpResponse.json(
        {
          success: false,
          code: "AUTH_LOGIN_REQUIRED",
          message: "로그인이 필요합니다.",
          data: null,
          timestamp: now,
        },
        { status: 401 },
      );
    }

    if (teamId === 403) {
      return HttpResponse.json(
        {
          success: false,
          code: "TEAM_ACCESS_DENIED",
          message: "접근 권한이 없습니다.",
          data: null,
          timestamp: now,
        },
        { status: 403 },
      );
    }

    if (Number.isNaN(teamId) || teamId === 404) {
      return HttpResponse.json(
        {
          success: false,
          code: "TEAM_NOT_FOUND",
          message: "팀을 찾을 수 없습니다.",
          data: null,
          timestamp: now,
        },
        { status: 404 },
      );
    }

    return HttpResponse.json({
      success: true,
      code: "OK",
      message: "팀 상세 정보 조회에 성공했습니다.",
      data: { ...teamDetail, id: teamId },
      timestamp: now,
    });
  }),

  // 팀명 수정
  apiMock.patch("/api/teams/:teamId", async ({ params, request }) => {
    const teamId = Number(params.teamId);
    const body = (await request.json()) as { name?: string };

    if (Number.isNaN(teamId) || teamId === 404) {
      return HttpResponse.json(
        {
          success: false,
          code: "TEAM_NOT_FOUND",
          message: "팀을 찾을 수 없습니다.",
          data: null,
          timestamp: now,
        },
        { status: 404 },
      );
    }

    if (!body?.name?.trim()) {
      return HttpResponse.json(
        {
          success: false,
          code: "TEAM_NAME_REQUIRED",
          message: "팀 이름을 입력해주세요.",
          data: null,
          timestamp: now,
        },
        { status: 400 },
      );
    }

    return HttpResponse.json({
      success: true,
      code: "OK",
      message: "팀 정보 수정에 성공했습니다.",
      data: {
        ...teamDetail,
        id: teamId,
        name: body.name.trim(),
        updatedAt: now,
      },
      timestamp: now,
    });
  }),

  // 팀 멤버 목록 조회
  apiMock.get("/api/teams/:teamId/members", ({ params }) => {
    const teamId = Number(params.teamId);

    if (Number.isNaN(teamId) || teamId === 404) {
      return HttpResponse.json(
        {
          success: false,
          code: "TEAM_NOT_FOUND",
          message: "팀을 찾을 수 없습니다.",
          data: null,
          timestamp: now,
        },
        { status: 404 },
      );
    }

    return HttpResponse.json({
      success: true,
      code: "OK",
      message: "팀 멤버 목록 조회 성공",
      data: members,
      timestamp: now,
    });
  }),

  // 팀원 초대
  apiMock.post(
    "/api/teams/:teamId/invitations",
    async ({ params, request }) => {
      const teamId = Number(params.teamId);
      const body = (await request.json()) as { email?: string };

      if (Number.isNaN(teamId) || teamId === 404) {
        return HttpResponse.json(
          {
            success: false,
            code: "TEAM_NOT_FOUND",
            message: "팀을 찾을 수 없습니다.",
            data: null,
            timestamp: now,
          },
          { status: 404 },
        );
      }

      if (!body?.email) {
        return HttpResponse.json(
          {
            success: false,
            code: "EMAIL_REQUIRED",
            message: "이메일을 입력해주세요.",
            data: null,
            timestamp: now,
          },
          { status: 400 },
        );
      }

      return HttpResponse.json({
        success: true,
        code: "OK",
        message: "팀 초대 생성에 성공했습니다.",
        data: null,
        timestamp: now,
      });
    },
  ),

  // 팀 삭제
  apiMock.delete("/api/teams/:teamId", ({ params }) => {
    const teamId = Number(params.teamId);

    if (Number.isNaN(teamId) || teamId === 404) {
      return HttpResponse.json(
        {
          success: false,
          code: "TEAM_NOT_FOUND",
          message: "팀을 찾을 수 없습니다.",
          data: null,
          timestamp: now,
        },
        { status: 404 },
      );
    }

    return HttpResponse.json({
      success: true,
      code: "OK",
      message: "팀 삭제에 성공했습니다.",
      data: null,
      timestamp: now,
    });
  }),
];
