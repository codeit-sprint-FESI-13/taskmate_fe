import { HttpResponse } from "msw";

import { apiMock } from "@/mocks/apiMock";

export const goalsHandlers = [
  apiMock.get("*/api/goals/:goalId/summary", ({ params }) => {
    const goalId = Number(params.goalId);
    const resolvedGoalId = Number.isNaN(goalId) ? 1 : goalId;

    return HttpResponse.json({
      success: true,
      code: "OK",
      message: "목표 요약 조회 성공",
      data: {
        goalId: resolvedGoalId,
        goalName: "디자인 시스템 완성",
        dueDate: "2026-12-31",
        dDay: 42,
        progressPercent: 68,
      },
    });
  }),

  apiMock.patch("*/api/goals/:goalId", async ({ params, request }) => {
    const goalId = Number(params.goalId);
    const id = Number.isNaN(goalId) ? 12 : goalId;
    const body = (await request.json()) as {
      name?: string;
      dueDate?: string;
    };

    return HttpResponse.json({
      success: true,
      code: "SUCCESS",
      message: "목표가 수정되었습니다.",
      data: {
        id,
        name: body.name ?? "백엔드 API 구현 수정",
        dueDate: body.dueDate ?? "2026-04-15",
        userId: null,
        teamId: 3,
      },
      timestamp: "2026-03-30T10:20:00Z",
    });
  }),

  apiMock.delete("*/api/goals/:goalId", () => {
    return HttpResponse.json({
      success: true,
      code: "SUCCESS",
      message: "목표가 휴지통으로 이동되었습니다.",
      data: null,
      timestamp: "2026-03-30T10:20:00Z",
    });
  }),

  apiMock.get("*/api/teams/:teamId/goals", ({ params, request }) => {
    const teamId = Number(params.teamId);
    const searchParams = new URL(request.url).searchParams;
    const sort = searchParams.get("sort") ?? "LATEST";
    const cursorCreatedAt = searchParams.get("cursorCreatedAt");
    const cursorId = searchParams.get("cursorId");
    const PAGE_SIZE = 6;

    if ((cursorCreatedAt && !cursorId) || (!cursorCreatedAt && cursorId)) {
      return HttpResponse.json(
        {
          success: false,
          code: "BAD_REQUEST",
          message: "cursorCreatedAt와 cursorId는 함께 전달해야 합니다.",
        },
        { status: 400 },
      );
    }

    const items = [
      {
        goalId: 120,
        name: "디자인 시스템 완성",
        progressPercent: 82,
        isFavorite: true,
        createdAt: "2026-03-31T09:12:45Z",
      },
      {
        goalId: 119,
        name: "컴포넌트 QA",
        progressPercent: 56,
        isFavorite: false,
        createdAt: "2026-03-31T08:10:00Z",
      },
      {
        goalId: 118,
        name: "테스트 코드 보강",
        progressPercent: 31,
        isFavorite: false,
        createdAt: "2026-03-30T21:15:00Z",
      },
      {
        goalId: 117,
        name: "배포 파이프라인 고도화",
        progressPercent: 49,
        isFavorite: false,
        createdAt: "2026-03-30T10:00:00Z",
      },
      {
        goalId: 116,
        name: "로그 대시보드 개선",
        progressPercent: 64,
        isFavorite: true,
        createdAt: "2026-03-29T16:42:00Z",
      },
      {
        goalId: 115,
        name: "문서 자동화 구축",
        progressPercent: 23,
        isFavorite: false,
        createdAt: "2026-03-29T08:30:00Z",
      },
      {
        goalId: 114,
        name: "릴리즈 체크리스트 정비",
        progressPercent: 70,
        isFavorite: false,
        createdAt: "2026-03-28T20:20:00Z",
      },
      {
        goalId: 113,
        name: "회귀 테스트 시나리오 추가",
        progressPercent: 18,
        isFavorite: false,
        createdAt: "2026-03-28T09:00:00Z",
      },
      {
        goalId: 112,
        name: "성능 최적화 2차",
        progressPercent: 40,
        isFavorite: true,
        createdAt: "2026-03-27T14:10:00Z",
      },
    ];

    const sortedItems =
      sort === "OLDEST"
        ? [...items].sort((a, b) => {
            if (a.createdAt === b.createdAt) return a.goalId - b.goalId;
            return a.createdAt.localeCompare(b.createdAt);
          })
        : [...items].sort((a, b) => {
            if (a.createdAt === b.createdAt) return b.goalId - a.goalId;
            return b.createdAt.localeCompare(a.createdAt);
          });

    const startIndex =
      cursorCreatedAt && cursorId
        ? sortedItems.findIndex(
            (item) =>
              item.createdAt === cursorCreatedAt &&
              item.goalId === Number(cursorId),
          ) + 1
        : 0;

    const pagedItems = sortedItems.slice(startIndex, startIndex + PAGE_SIZE);
    const lastItem = pagedItems[pagedItems.length - 1];
    const hasNext = startIndex + PAGE_SIZE < sortedItems.length;

    return HttpResponse.json({
      success: true,
      code: "OK",
      message: `${Number.isNaN(teamId) ? "1" : String(teamId)}번 팀 목표 목록 조회 성공`,
      data: {
        items: pagedItems,
        nextCursor: hasNext
          ? {
              cursorCreatedAt: lastItem.createdAt,
              cursorId: lastItem.goalId,
            }
          : null,
        size: PAGE_SIZE,
      },
    });
  }),

  apiMock.get("*/api/goals/personal", () => {
    // 테스트용: 요청마다 약 50% 확률로 실패 (필요 시 비율만 조정)
    if (Math.random() < 0.5) {
      return HttpResponse.json(
        {
          success: false,
          code: "INTERNAL_ERROR",
          message: "개인 목표 목록 조회 실패",
        },
        { status: 500 },
      );
    }

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
