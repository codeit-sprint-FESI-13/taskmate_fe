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

const makeTodo = ({
  id,
  goalId,
  status,
  goalType,
  goalOwnerId,
}: {
  id: number;
  goalId: number;
  status: TodoStatus;
  goalType: "PERSONAL" | "TEAM";
  goalOwnerId: number;
}) => {
  const day = (id % 28) + 1;
  const paddedDay = String(day).padStart(2, "0");
  const assigneeIds =
    goalType === "PERSONAL"
      ? []
      : id % 3 === 0
        ? [MY_USER_ID, 201]
        : id % 3 === 1
          ? [MY_USER_ID]
          : [202];

  return {
    id,
    goalId,
    goalType,
    goalOwnerId,
    title: `${status} 할 일 ${id}`,
    status,
    startDate: `2026-04-${paddedDay}`,
    dueDate: `2026-05-${paddedDay}`,
    memo: `${status} 상태 테스트 데이터 ${id}`,
    createdAt: `2026-04-${paddedDay}T10:00:00.000Z`,
    assigneeIds,
  };
};

const mockTodos = [
  ...Array.from({ length: 18 }, (_, index) =>
    makeTodo({
      id: index + 1,
      goalId: 1,
      status: "TODO",
      goalType: "PERSONAL",
      goalOwnerId: MY_USER_ID,
    }),
  ),
  ...Array.from({ length: 16 }, (_, index) =>
    makeTodo({
      id: index + 101,
      goalId: 1,
      status: "DOING",
      goalType: "PERSONAL",
      goalOwnerId: MY_USER_ID,
    }),
  ),
  ...Array.from({ length: 14 }, (_, index) =>
    makeTodo({
      id: index + 201,
      goalId: 1,
      status: "DONE",
      goalType: "PERSONAL",
      goalOwnerId: MY_USER_ID,
    }),
  ),
  ...Array.from({ length: 20 }, (_, index) =>
    makeTodo({
      id: index + 301,
      goalId: 2,
      status: "TODO",
      goalType: "TEAM",
      goalOwnerId: 999,
    }),
  ),
  ...Array.from({ length: 20 }, (_, index) =>
    makeTodo({
      id: index + 401,
      goalId: 2,
      status: "DOING",
      goalType: "TEAM",
      goalOwnerId: 999,
    }),
  ),
  ...Array.from({ length: 20 }, (_, index) =>
    makeTodo({
      id: index + 501,
      goalId: 2,
      status: "DONE",
      goalType: "TEAM",
      goalOwnerId: 999,
    }),
  ),
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

    const goalMatchedItems = mockTodos.filter(
      (todo) => todo.goalId === resolvedGoalId,
    );
    let items =
      goalMatchedItems.length > 0
        ? goalMatchedItems
        : mockTodos.map((todo) => ({ ...todo, goalId: resolvedGoalId }));

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
          ({
            id,
            goalId,
            title,
            status,
            startDate,
            dueDate,
            memo,
            createdAt,
            assigneeIds,
          }) => ({
            id,
            goalId,
            title,
            status,
            startDate,
            dueDate,
            memo,
            assigneeSummary:
              assigneeIds.length === 0
                ? "담당자 없음"
                : assigneeIds.length === 1
                  ? `유저${assigneeIds[0]}`
                  : `유저${assigneeIds[0]} 외 ${assigneeIds.length - 1}명`,
            assignees: assigneeIds.map((userId) => ({
              userId,
              nickname: `유저${userId}`,
            })),
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
