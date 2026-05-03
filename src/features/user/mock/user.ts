import { HttpResponse } from "msw";

import { apiMock } from "@/shared/mock/apiMock";

const mockUserInfo = {
  id: 101,
  email: "leader@example.com",
  nickname: "팀장",
  profileImageUrl: null,
  provider: "LOCAL",
  createdAt: new Date().toISOString(),
};

export const userHandlers = [
  // 내 정보 수정
  apiMock.put("/api/users", async ({ request }: { request: Request }) => {
    const body = (await request.json()) as { nickname?: string };
    return HttpResponse.json({
      success: true,
      code: "SUCCESS",
      message: "내 정보 수정에 성공했습니다.",
      data: {
        ...mockUserInfo,
        nickname: body.nickname ?? mockUserInfo.nickname,
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // 프로필 이미지 업로드
  apiMock.put("/api/users/image", async () => {
    return HttpResponse.json({
      success: true,
      code: "SUCCESS",
      message: "프로필 이미지 업로드에 성공했습니다.",
      data: {
        ...mockUserInfo,
        profileImageUrl: "https://placehold.co/100x100",
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // 회원 탈퇴
  apiMock.delete("/api/users/me", () => {
    return HttpResponse.json({
      success: true,
      code: "SUCCESS",
      message: "회원 탈퇴에 성공했습니다.",
      data: null,
      timestamp: new Date().toISOString(),
    });
  }),
];
