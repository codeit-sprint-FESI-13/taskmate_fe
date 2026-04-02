import { HttpResponse } from "msw";

import { apiMock } from "@/mocks/apiMock";

type CreateTodoRequestBody = {
  todoData?: {
    title?: string;
    startDate?: string;
    dueDate?: string;
    assigneeIds?: string[];
    memo?: string;
  };
};

export const todosHandlers = [
  apiMock.get("*/api/goals/:goalId/todos", ({ params }) => {
    const goalId = Number(params.goalId);
    const resolvedGoalId = Number.isNaN(goalId) ? 1 : goalId;

    return HttpResponse.json({
      success: true,
      code: "OK",
      message: "할 일 목록 조회 성공",
      data: [
        {
          id: 1,
          goalId: resolvedGoalId,
          title: "요구사항 정리",
          startDate: "2026-04-01",
          dueDate: "2026-04-03",
          status: "TODO",
          memo: "기획 문서와 디자인 시안 확인",
          assigneeSummary: "두잉두잉 외 1명",
          assignees: [
            { userId: 1, nickname: "두잉두잉" },
            { userId: 2, nickname: "김프론" },
          ],
        },
        {
          id: 2,
          goalId: resolvedGoalId,
          title: "공통 컴포넌트 구현",
          startDate: "2026-04-01",
          dueDate: "2026-04-05",
          status: "DOING",
          memo: "Input/Modal/Button 우선 구현",
          assigneeSummary: "이백엔드",
          assignees: [{ userId: 3, nickname: "이백엔드" }],
        },
        {
          id: 3,
          goalId: resolvedGoalId,
          title: "단위 테스트 작성",
          startDate: "2026-03-28",
          dueDate: "2026-04-02",
          status: "DONE",
          memo: "핵심 유틸 함수 테스트 완료",
          assigneeSummary: "박풀스택",
          assignees: [{ userId: 4, nickname: "박풀스택" }],
        },
      ],
    });
  }),

  apiMock.post("*/api/goals/:goalId/todos", async ({ request, params }) => {
    const body = (await request
      .json()
      .catch(() => ({}))) as CreateTodoRequestBody;
    const todoData = body.todoData ?? {};

    const title = todoData.title?.trim();
    const startDate = todoData.startDate;
    const dueDate = todoData.dueDate;

    if (!title || !startDate || !dueDate) {
      return HttpResponse.json(
        {
          success: false,
          code: "VALIDATION_ERROR",
          message: "필수 입력값이 누락되었습니다.",
        },
        { status: 400 },
      );
    }

    return HttpResponse.json({
      success: true,
      code: "OK",
      message: `${params.goalId} 목표에 할 일을 생성했습니다.`,
    });
  }),
];
