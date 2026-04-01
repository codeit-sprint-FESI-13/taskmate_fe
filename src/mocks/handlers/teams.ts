import { HttpResponse } from "msw";

import { apiMock } from "@/mocks/apiMock";

export const teamsHandlers = [
  apiMock.get("*/api/teams/me", () => {
    return HttpResponse.json({
      success: true,
      code: "OK",
      message: "내 팀 목록 조회 성공",
      data: [
        {
          teamId: 1,
          teamName: "프론트엔드 1팀",
          goals: [
            { goalId: 101, goalName: "디자인시스템 정리" },
            { goalId: 102, goalName: "컴포넌트 QA" },
          ],
        },
        {
          teamId: 2,
          teamName: "프론트엔드 2팀",
          goals: [{ goalId: 201, goalName: "대시보드 개선" }],
        },
      ],
    });
  }),

  apiMock.post("*/api/teams", async ({ request }) => {
    const body = (await request.json().catch(() => ({}))) as { name?: string };
    const name = body.name?.trim();

    if (!name) {
      return HttpResponse.json(
        {
          message: "팀 이름을 입력해주세요.",
          success: false,
        },
        { status: 400 },
      );
    }

    return HttpResponse.json({
      success: true,
    });
  }),

  apiMock.get("*/api/teams/:teamId/summary", ({ params }) => {
    const teamId = Number(params.teamId);

    return HttpResponse.json({
      success: true,
      code: "OK",
      message: "팀 요약 조회 성공",
      data: {
        teamId: Number.isNaN(teamId) ? 1 : teamId,
        teamName: "프론트엔드 1팀",
        isAdmin: true,
        todayProgressPercentage: 70,
        todayTodoCount: 10,
        overdueTodoCount: 2,
        doneTodoCount: 8,
      },
      timestamp: new Date().toISOString(),
    });
  }),

  apiMock.delete("*/api/teams/:teamId/leave", () => {
    const data = [
      {
        code: "SUCCESS",
        message: "팀 나가기에 성공했습니다.",
      },
      {
        code: "TEAM_LEAVE_ADMIN_TRANSFER_REQUIRED",
        message: "탈퇴하려면 다른 멤버에게 ADMIN 권한을 위임해야 합니다.",
      },
      {
        code: "TEAM_LEAVE_LAST_ADMIN_CANNOT_LEAVE",
        message: "마지막 ADMIN은 팀을 나갈 수 없습니다.",
      },
    ];

    const randomIndex = Math.floor(Math.random() * data.length);

    return HttpResponse.json(
      {
        success: false,
        code: data[randomIndex].code,
        message: data[randomIndex].message,
      },
      { status: data[randomIndex].code === "SUCCESS" ? 200 : 400 },
    );
  }),
];
