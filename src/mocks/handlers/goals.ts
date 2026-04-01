import { HttpResponse } from "msw";

import { apiMock } from "@/mocks/apiMock";

export const goalsHandlers = [
  apiMock.get("*/api/teams/:teamId/goals", ({ params, request }) => {
    const teamId = Number(params.teamId);
    const sort = new URL(request.url).searchParams.get("sort");

    const items = [
      {
        goalId: 101,
        name: "디자인 시스템 완성",
        progressPercent: 82,
        isFavorite: true,
      },
      {
        goalId: 102,
        name: "컴포넌트 QA",
        progressPercent: 56,
        isFavorite: false,
      },
      {
        goalId: 103,
        name: "테스트 코드 보강",
        progressPercent: 31,
        isFavorite: false,
      },
    ];

    const sortedItems = sort === "OLDEST" ? [...items].reverse() : items;

    return HttpResponse.json({
      success: true,
      code: "OK",
      message: `${Number.isNaN(teamId) ? "1" : String(teamId)}번 팀 목표 목록 조회 성공`,
      data: {
        items: sortedItems,
      },
    });
  }),

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
