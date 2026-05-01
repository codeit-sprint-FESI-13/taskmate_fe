import { HttpResponse } from "msw";

import { apiMock } from "@/shared/mock/apiMock";

const now = "2026-04-02T00:00:00Z";
const PAGE_SIZE = 10;

const progressData = {
  teamProgress: [
    { teamId: 1, teamName: "프론트 팀", todayProgressPercent: 75 },
    { teamId: 2, teamName: "백엔드 팀", todayProgressPercent: 60 },
    { teamId: 3, teamName: "디자인 팀", todayProgressPercent: 45 },
  ],
  myProgressPercent: 68,
};

const favoriteGoals = Array.from({ length: 10 }).map((_, i) => ({
  teamId: 1,
  teamName: "프론트",
  goalId: i + 1,
  goalName: `목표 ${i + 1}`,
  progressPercent: Math.floor(Math.random() * 100),
  isFavorite: true,
  createdAt: now,
}));

const recentTodos = Array.from({ length: 15 }).map((_, i) => ({
  todoId: i + 1,
  title: `최근 할 일 ${i + 1}`,
  teamDisplayName: "프론트",
  goalTitle: `목표 ${i + 1}`,
  dueDate: "2026-04-10",
}));

const dueSoonTodos = Array.from({ length: 10 }).map((_, i) => ({
  todoId: i + 100,
  title: `마감 임박 ${i + 1}`,
  teamDisplayName: "백엔드",
  goalTitle: `목표 ${i + 1}`,
  dueDate: "2026-04-03",
}));

export const homeHandler = [
  apiMock.get("/api/main/progress", () => {
    return HttpResponse.json({
      success: true,
      code: "OK",
      message: "진행 상황 조회 성공",
      data: progressData,
      timestamp: now,
    });
  }),

  apiMock.get("/api/main/favorite-goals", ({ request }) => {
    const url = new URL(request.url);
    const cursor = Number(url.searchParams.get("cursor") ?? 0);

    const items = favoriteGoals.slice(cursor, cursor + PAGE_SIZE);
    const nextCursor =
      cursor + PAGE_SIZE < favoriteGoals.length ? cursor + PAGE_SIZE : null;

    return HttpResponse.json({
      success: true,
      code: "OK",
      message: "즐겨찾기 목표 조회 성공",
      data: { items, nextCursor },
      timestamp: now,
    });
  }),

  apiMock.get("/api/todos/recent", ({ request }) => {
    const url = new URL(request.url);
    const cursor = Number(url.searchParams.get("cursor") ?? 0);

    const items = recentTodos.slice(cursor, cursor + PAGE_SIZE);
    const nextCursor =
      cursor + PAGE_SIZE < recentTodos.length ? cursor + PAGE_SIZE : null;

    return HttpResponse.json({
      success: true,
      code: "OK",
      message: "최근 할 일 조회 성공",
      data: { items, nextCursor },
      timestamp: now,
    });
  }),

  apiMock.get("/api/todos/due-soon", ({ request }) => {
    const url = new URL(request.url);
    const cursor = Number(url.searchParams.get("cursor") ?? 0);

    const items = dueSoonTodos.slice(cursor, cursor + PAGE_SIZE);
    const nextCursor =
      cursor + PAGE_SIZE < dueSoonTodos.length ? cursor + PAGE_SIZE : null;

    return HttpResponse.json({
      success: true,
      code: "OK",
      message: "마감 임박 할 일 조회 성공",
      data: { items, nextCursor },
      timestamp: now,
    });
  }),
];
