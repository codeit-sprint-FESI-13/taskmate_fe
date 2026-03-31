import { HttpResponse } from "msw";

import { apiMock } from "@/mocks/apiMock";

export const teamsHandlers = [
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
];
