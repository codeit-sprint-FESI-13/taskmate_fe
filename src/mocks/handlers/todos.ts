import { HttpResponse } from "msw";

import { apiMock } from "@/mocks/apiMock";

type CreateTodoRequestBody = {
  todoData?: {
    title?: string;
    startDate?: string;
    endDate?: string;
    assigneeIds?: string[];
    memo?: string;
  };
};

export const todosHandlers = [
  apiMock.post("*/api/goals/:goalId/todos", async ({ request, params }) => {
    const body = (await request
      .json()
      .catch(() => ({}))) as CreateTodoRequestBody;
    const todoData = body.todoData ?? {};

    const title = todoData.title?.trim();
    const startDate = todoData.startDate;
    const endDate = todoData.endDate;

    if (!title || !startDate || !endDate) {
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
