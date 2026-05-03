import { HttpResponse } from "msw";

import { apiMock } from "@/shared/mock/apiMock";

const mockPersonalTrashItems = [
  {
    itemType: "GOAL",
    id: 1,
    deletedAt: new Date().toISOString(),
    goalName: "이번 주 운동",
    todoTitle: null,
  },
  {
    itemType: "TODO",
    id: 10,
    deletedAt: new Date().toISOString(),
    goalName: "이번 주 운동",
    todoTitle: "러닝 30분",
  },
  {
    itemType: "TODO",
    id: 11,
    deletedAt: new Date().toISOString(),
    goalName: "독서",
    todoTitle: "클린코드 1장",
  },
];

const mockTeamTrashItems = [
  {
    itemType: "GOAL",
    id: 2,
    deletedAt: new Date().toISOString(),
    teamName: "디자인팀",
    goalName: "스프린트 목표",
    todoTitle: null,
  },
  {
    itemType: "TODO",
    id: 20,
    deletedAt: new Date().toISOString(),
    teamName: "디자인팀",
    goalName: "스프린트 목표",
    todoTitle: "와이어프레임",
  },
];

export const trashHandlers = [
  // 개인 휴지통 조회
  apiMock.get("/api/trash/personal", ({ request }: { request: Request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? 0);
    const size = Number(url.searchParams.get("size") ?? 20);
    const content = mockPersonalTrashItems.slice(
      page * size,
      (page + 1) * size,
    );

    return HttpResponse.json({
      success: true,
      code: "SUCCESS",
      message: "개인 휴지통 조회에 성공했습니다.",
      data: {
        content,
        page,
        size,
        totalElements: mockPersonalTrashItems.length,
        totalPages: Math.ceil(mockPersonalTrashItems.length / size),
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // 팀 휴지통 조회
  apiMock.get(
    "/api/trash/teams/:teamId",
    ({ request }: { request: Request }) => {
      const url = new URL(request.url);
      const page = Number(url.searchParams.get("page") ?? 0);
      const size = Number(url.searchParams.get("size") ?? 20);
      const content = mockTeamTrashItems.slice(page * size, (page + 1) * size);

      return HttpResponse.json({
        success: true,
        code: "SUCCESS",
        message: "팀 휴지통 조회에 성공했습니다.",
        data: {
          content,
          page,
          size,
          totalElements: mockTeamTrashItems.length,
          totalPages: Math.ceil(mockTeamTrashItems.length / size),
        },
        timestamp: new Date().toISOString(),
      });
    },
  ),

  // 휴지통 복구
  apiMock.post("/api/trash/restore", async () => {
    return HttpResponse.json({
      success: true,
      code: "SUCCESS",
      message: "휴지통 복구에 성공했습니다.",
      data: null,
      timestamp: new Date().toISOString(),
    });
  }),

  // 휴지통 영구 삭제
  apiMock.delete("/api/trash", async () => {
    return HttpResponse.json({
      success: true,
      code: "SUCCESS",
      message: "휴지통 영구 삭제에 성공했습니다.",
      data: null,
      timestamp: new Date().toISOString(),
    });
  }),
];
