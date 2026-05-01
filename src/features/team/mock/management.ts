import { HttpResponse } from "msw";

import { apiMock } from "@/shared/mock/apiMock";

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
    userNickname: "팀장",
    role: "ADMIN",
    joinedAt: now,
  },
  {
    id: 2,
    userId: 1001,
    profileImageUrl: "",
    userEmail: "member01@example.com",
    userNickname: "팀원01",
    role: "MEMBER",
    joinedAt: now,
  },
  {
    id: 3,
    userId: 1002,
    profileImageUrl: "",
    userEmail: "member02@example.com",
    userNickname: "팀원02",
    role: "MEMBER",
    joinedAt: now,
  },
  {
    id: 4,
    userId: 1003,
    profileImageUrl: "",
    userEmail: "member03@example.com",
    userNickname: "팀원03",
    role: "MEMBER",
    joinedAt: now,
  },
  {
    id: 5,
    userId: 1004,
    profileImageUrl: "",
    userEmail: "member04@example.com",
    userNickname: "팀원04",
    role: "MEMBER",
    joinedAt: now,
  },
  {
    id: 6,
    userId: 1005,
    profileImageUrl: "",
    userEmail: "member05@example.com",
    userNickname: "팀원05",
    role: "MEMBER",
    joinedAt: now,
  },
  {
    id: 7,
    userId: 1006,
    profileImageUrl: "",
    userEmail: "member06@example.com",
    userNickname: "팀원06",
    role: "MEMBER",
    joinedAt: now,
  },
  {
    id: 8,
    userId: 1007,
    profileImageUrl: "",
    userEmail: "member07@example.com",
    userNickname: "팀원07",
    role: "MEMBER",
    joinedAt: now,
  },
  {
    id: 9,
    userId: 1008,
    profileImageUrl: "",
    userEmail: "member08@example.com",
    userNickname: "팀원08",
    role: "MEMBER",
    joinedAt: now,
  },
  {
    id: 10,
    userId: 1009,
    profileImageUrl: "",
    userEmail: "member09@example.com",
    userNickname: "팀원09",
    role: "MEMBER",
    joinedAt: now,
  },
  {
    id: 11,
    userId: 1010,
    profileImageUrl: "",
    userEmail: "member10@example.com",
    userNickname: "팀원10",
    role: "MEMBER",
    joinedAt: now,
  },
  {
    id: 12,
    userId: 1011,
    profileImageUrl: "",
    userEmail: "member11@example.com",
    userNickname: "팀원11",
    role: "MEMBER",
    joinedAt: now,
  },
  {
    id: 13,
    userId: 1012,
    profileImageUrl: "",
    userEmail: "member12@example.com",
    userNickname: "팀원12",
    role: "MEMBER",
    joinedAt: now,
  },
  {
    id: 14,
    userId: 1013,
    profileImageUrl: "",
    userEmail: "member13@example.com",
    userNickname: "팀원13",
    role: "MEMBER",
    joinedAt: now,
  },
  {
    id: 15,
    userId: 1014,
    profileImageUrl: "",
    userEmail: "member14@example.com",
    userNickname: "팀원14",
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

  // 팀원 삭제
  apiMock.delete("/api/teams/:teamId/members/:teamMemberId", ({ params }) => {
    const teamId = Number(params.teamId);
    const teamMemberId = Number(params.teamMemberId);

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

    if (Number.isNaN(teamMemberId)) {
      return HttpResponse.json(
        {
          success: false,
          code: "MEMBER_NOT_FOUND",
          message: "팀원을 찾을 수 없습니다.",
          data: null,
          timestamp: now,
        },
        { status: 404 },
      );
    }

    const memberIndex = members.findIndex(
      (member) => member.id === teamMemberId,
    );

    if (memberIndex === -1) {
      return HttpResponse.json(
        {
          success: false,
          code: "MEMBER_NOT_FOUND",
          message: "팀원을 찾을 수 없습니다.",
          data: null,
          timestamp: now,
        },
        { status: 404 },
      );
    }

    members.splice(memberIndex, 1);

    return HttpResponse.json({
      success: true,
      code: "SUCCESS",
      message: "팀원 삭제에 성공했습니다.",
      data: null,
      timestamp: now,
    });
  }),

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
