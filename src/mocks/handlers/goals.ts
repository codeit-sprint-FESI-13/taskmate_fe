import { HttpResponse } from "msw";

import { apiMock } from "@/mocks/apiMock";

export const goalsHandlers = [
  apiMock.get("*/api/goals/personal", () => {
    return HttpResponse.json({
      success: true,
      code: "OK",
      message: "개인 목표 목록 조회 성공",
      data: [
        {
          goalId: 1,
          goalName: "알고리즘 1문제 풀기",
        },
        {
          goalId: 2,
          goalName: "React Query 학습 정리",
        },
        {
          goalId: 3,
          goalName: "포트폴리오 리팩토링",
        },
      ],
    });
  }),
];
