import { HttpResponse } from "msw";

import { apiMock } from "@/shared/mock/apiMock";

const now = "2026-04-02T00:00:00Z";

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: "TODO_DUE_SOON",
    message: "[코드 리팩토링]의 마감일이 하루 남았어요!",
    isRead: false,
    createdAt: now,

    goalId: 1,
    teamId: 1,
    goalName: "코드 리팩토링",
    spaceName: "TaskMate Team",
  },
  {
    id: 2,
    type: "TEAM_TODO_CREATED",
    message: "[API 에러 핸들링] 할 일이 생성되었어요!",
    isRead: true,
    createdAt: now,

    goalId: 2,
    teamId: 1,
    goalName: "API 에러 핸들링",
    spaceName: "TaskMate Team",
  },
  {
    id: 3,
    type: "TODO_DUE_SOON",
    message: "[React Query 최적화]의 마감일이 하루 남았어요!",
    isRead: false,
    createdAt: now,

    goalId: 3,
    teamId: 1,
    goalName: "React Query 최적화",
    spaceName: "TaskMate Team",
  },
  {
    id: 4,
    type: "TEAM_TODO_CREATED",
    message: "[로그인 UI 개선] 할 일이 생성되었어요!",
    isRead: true,
    createdAt: now,

    goalId: 4,
    teamId: 1,
    goalName: "로그인 UI 개선",
    spaceName: "TaskMate Team",
  },
  {
    id: 5,
    type: "TODO_DUE_SOON",
    message: "[토큰 만료 처리]의 마감일이 하루 남았어요!",
    isRead: false,
    createdAt: now,

    goalId: 5,
    teamId: 1,
    goalName: "토큰 만료 처리",
    spaceName: "TaskMate Team",
  },
];

const notifications = [...INITIAL_NOTIFICATIONS];

export const resetNotifications = () => {
  notifications.splice(0, notifications.length, ...INITIAL_NOTIFICATIONS);
};

export const notificationHandler = [
  // 알림 목록 조회 (infinite)
  apiMock.get("/api/notifications", ({ request }) => {
    const url = new URL(request.url);
    const cursor = Number(url.searchParams.get("cursor") ?? 0);

    const PAGE_SIZE = 10;

    const start = cursor;
    const end = start + PAGE_SIZE;

    const items = notifications.slice(start, end);
    const nextCursor = end < notifications.length ? end : null;

    return HttpResponse.json({
      success: true,
      code: "OK",
      message: "알림 목록 조회 성공",
      data: {
        items,
        nextCursor,
      },
      timestamp: now,
    });
  }),

  // 알림 읽음 처리 (단건)
  apiMock.patch("/api/notifications/:notificationId/read", ({ params }) => {
    const notificationId = Number(params.notificationId);

    if (Number.isNaN(notificationId)) {
      return HttpResponse.json(
        {
          success: false,
          code: "NOTIFICATION_NOT_FOUND",
          message: "알림을 찾을 수 없습니다.",
          data: null,
          timestamp: now,
        },
        { status: 404 },
      );
    }

    const target = notifications.find((n) => n.id === notificationId);

    if (!target) {
      return HttpResponse.json(
        {
          success: false,
          code: "NOTIFICATION_NOT_FOUND",
          message: "알림을 찾을 수 없습니다.",
          data: null,
          timestamp: now,
        },
        { status: 404 },
      );
    }

    target.isRead = true;

    return HttpResponse.json({
      success: true,
      code: "OK",
      message: "알림 읽음 처리 성공",
      data: null,
      timestamp: now,
    });
  }),

  // 전체 읽음 처리
  apiMock.patch("/api/notifications/read-all", () => {
    notifications.forEach((n) => {
      n.isRead = true;
    });

    return HttpResponse.json({
      success: true,
      code: "OK",
      message: "전체 읽음 처리 성공",
      data: null,
      timestamp: now,
    });
  }),
];
