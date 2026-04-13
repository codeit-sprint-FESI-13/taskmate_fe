import { HttpResponse } from "msw";

import { apiMock } from "@/mocks/apiMock";

type TodoStatus = "TODO" | "DOING" | "DONE";
type TodoSort = "DUE_DATE" | "CREATED_LATEST" | "CREATED_OLDEST";

type CreateTodoRequestBody = {
  title?: string;
  startDate?: string;
  dueDate?: string;
  assigneeIds?: number[];
  memo?: string;
};

type PatchTodoRequestBody = Partial<CreateTodoRequestBody> & {
  status?: TodoStatus;
};

const MY_USER_ID = 101;

const mockTodos = [
  {
    id: 1,
    goalId: 1,
    goalType: "PERSONAL" as const,
    goalOwnerId: MY_USER_ID,
    title: "요구사항 정리",
    status: "TODO" as TodoStatus,
    startDate: "2026-04-01",
    dueDate: "2026-04-03",
    memo: "기획 문서와 디자인 시안 확인",
    createdAt: "2026-04-01T10:00:00.000Z",
    assigneeIds: [] as number[],
  },
  {
    id: 2,
    goalId: 1,
    goalType: "PERSONAL" as const,
    goalOwnerId: MY_USER_ID,
    title: "공통 컴포넌트 구현",
    status: "DOING" as TodoStatus,
    startDate: "2026-04-01",
    dueDate: "2026-04-05",
    memo: "Input/Modal/Button 우선 구현",
    createdAt: "2026-04-03T10:00:00.000Z",
    assigneeIds: [] as number[],
  },
  {
    id: 3,
    goalId: 1,
    goalType: "PERSONAL" as const,
    goalOwnerId: MY_USER_ID,
    title: "단위 테스트 작성",
    status: "DONE" as TodoStatus,
    startDate: "2026-03-28",
    dueDate: "2026-04-02",
    memo: "핵심 유틸 함수 테스트 완료",
    createdAt: "2026-03-30T10:00:00.000Z",
    assigneeIds: [] as number[],
  },
  {
    id: 4,
    goalId: 2,
    goalType: "TEAM" as const,
    goalOwnerId: 999,
    title: "API 명세 점검",
    status: "TODO" as TodoStatus,
    startDate: "2026-04-06",
    dueDate: "2026-04-10",
    memo: "응답 필드 누락 확인",
    createdAt: "2026-04-05T09:00:00.000Z",
    assigneeIds: [MY_USER_ID, 201],
  },
  {
    id: 5,
    goalId: 2,
    goalType: "TEAM" as const,
    goalOwnerId: 999,
    title: "UI QA",
    status: "DOING" as TodoStatus,
    startDate: "2026-04-07",
    dueDate: "2026-04-12",
    memo: "반응형 깨짐 점검",
    createdAt: "2026-04-06T09:00:00.000Z",
    assigneeIds: [202],
  },
  {
    id: 6,
    goalId: 2,
    goalType: "TEAM" as const,
    goalOwnerId: 999,
    title: "릴리즈 체크리스트 작성",
    status: "DONE" as TodoStatus,
    startDate: "2026-04-08",
    dueDate: "2026-04-11",
    memo: "배포 전 항목 정리",
    createdAt: "2026-04-04T09:00:00.000Z",
    assigneeIds: [MY_USER_ID],
  },
];

export const todosHandlers = [
  apiMock.get("*/api/goals/:goalId/todos", ({ params, request }) => {
    const goalId = Number(params.goalId);
    const resolvedGoalId = Number.isNaN(goalId) ? 1 : goalId;
    const url = new URL(request.url);
    const mineOnly = url.searchParams.get("mineOnly") === "true";
    const titleContains = (url.searchParams.get("titleContains") ?? "").trim();
    const status = url.searchParams.get("status");
    const sort = (url.searchParams.get("sort") ?? "DUE_DATE") as TodoSort;
    const limit = Math.max(
      1,
      Math.min(50, Number(url.searchParams.get("limit") ?? "5")),
    );
    const cursorId = Number(url.searchParams.get("cursorId") ?? "0");
    const cursorDueDate = url.searchParams.get("cursorDueDate");
    const cursorCreatedAt = url.searchParams.get("cursorCreatedAt");

    if (
      status !== null &&
      status !== "TODO" &&
      status !== "DOING" &&
      status !== "DONE"
    ) {
      return HttpResponse.json(
        {
          success: false,
          code: "VALIDATION_ERROR",
          message: "status는 TODO | DOING | DONE 중 하나여야 합니다.",
          timestamp: new Date().toISOString(),
        },
        { status: 400 },
      );
    }

    if (
      sort !== "DUE_DATE" &&
      sort !== "CREATED_LATEST" &&
      sort !== "CREATED_OLDEST"
    ) {
      return HttpResponse.json(
        {
          success: false,
          code: "VALIDATION_ERROR",
          message: "sort는 DUE_DATE | CREATED_LATEST | CREATED_OLDEST 입니다.",
          timestamp: new Date().toISOString(),
        },
        { status: 400 },
      );
    }

    if (titleContains.length > 40) {
      return HttpResponse.json(
        {
          success: false,
          code: "VALIDATION_ERROR",
          message: "titleContains는 최대 40자입니다.",
          timestamp: new Date().toISOString(),
        },
        { status: 400 },
      );
    }

    let items = mockTodos.filter((todo) => todo.goalId === resolvedGoalId);

    if (mineOnly) {
      items = items.filter((todo) => {
        const includesMe = todo.assigneeIds.includes(MY_USER_ID);
        const personalMine =
          todo.goalType === "PERSONAL" && todo.goalOwnerId === MY_USER_ID;
        return includesMe || personalMine;
      });
    }

    if (titleContains) {
      const normalizedQuery = titleContains.toLowerCase();
      items = items.filter((todo) =>
        todo.title.toLowerCase().includes(normalizedQuery),
      );
    }

    if (status) {
      items = items.filter((todo) => todo.status === status);
    }

    const sorted = [...items].sort((a, b) => {
      if (sort === "DUE_DATE") {
        if (a.dueDate !== b.dueDate) return a.dueDate.localeCompare(b.dueDate);
        return a.id - b.id;
      }
      if (sort === "CREATED_LATEST") {
        if (a.createdAt !== b.createdAt)
          return b.createdAt.localeCompare(a.createdAt);
        return b.id - a.id;
      }
      if (a.createdAt !== b.createdAt)
        return a.createdAt.localeCompare(b.createdAt);
      return a.id - b.id;
    });

    const paged = sorted.filter((todo) => {
      if (!cursorId) return true;
      if (sort === "DUE_DATE") {
        if (!cursorDueDate) return true;
        return (
          todo.dueDate > cursorDueDate ||
          (todo.dueDate === cursorDueDate && todo.id > cursorId)
        );
      }
      if (!cursorCreatedAt) return true;
      if (sort === "CREATED_LATEST") {
        return (
          todo.createdAt < cursorCreatedAt ||
          (todo.createdAt === cursorCreatedAt && todo.id < cursorId)
        );
      }
      return (
        todo.createdAt > cursorCreatedAt ||
        (todo.createdAt === cursorCreatedAt && todo.id > cursorId)
      );
    });

    const pageItems = paged.slice(0, limit);
    const hasNext = paged.length > limit;
    const lastItem = pageItems[pageItems.length - 1];

    return HttpResponse.json({
      success: true,
      code: "SUCCESS",
      message: "할 일 목록 조회 성공",
      data: {
        sort,
        items: pageItems.map(
          ({ id, title, status, startDate, dueDate, memo, createdAt }) => ({
            id,
            title,
            status,
            startDate,
            dueDate,
            memo,
            createdAt,
          }),
        ),
        hasNext,
        nextCursorDueDate:
          hasNext && lastItem && sort === "DUE_DATE" ? lastItem.dueDate : null,
        nextCursorCreatedAt:
          hasNext && lastItem && sort !== "DUE_DATE"
            ? lastItem.createdAt
            : null,
        nextCursorId: hasNext && lastItem ? lastItem.id : null,
      },
      timestamp: new Date().toISOString(),
    });
  }),

  apiMock.post("*/api/goals/:goalId/todos", async ({ request, params }) => {
    const body = (await request
      .json()
      .catch(() => ({}))) as CreateTodoRequestBody;

    const title = body.title?.trim();
    const startDate = body.startDate;
    const dueDate = body.dueDate;

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

  apiMock.patch(
    "*/api/goals/:goalId/todos/:todoId",
    async ({ request, params }) => {
      const body = (await request
        .json()
        .catch(() => ({}))) as PatchTodoRequestBody;

      if (body.title !== undefined && !body.title?.trim()) {
        return HttpResponse.json(
          {
            success: false,
            code: "VALIDATION_ERROR",
            message: "제목은 비어있을 수 없습니다.",
          },
          { status: 400 },
        );
      }

      return HttpResponse.json({
        success: true,
        code: "OK",
        message: `${params.goalId} 목표의 ${params.todoId} 할 일을 수정했습니다.`,
      });
    },
  ),

  apiMock.delete("*/api/goals/:goalId/todos/:todoId", ({ params }) => {
    return HttpResponse.json({
      success: true,
      code: "OK",
      message: `${params.goalId} 목표의 ${params.todoId} 할 일을 삭제했습니다.`,
    });
  }),
];
