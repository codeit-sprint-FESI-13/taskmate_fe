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
];
