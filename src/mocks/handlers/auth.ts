import { HttpResponse } from "msw";

import { apiMock } from "@/mocks/apiMock";

export const authHandlers = [
  // 내 정보 조회
  apiMock.get("/api/users/me", () => {
    return HttpResponse.json({
      success: true,
      code: "SUCCESS",
      message: "내 정보 조회에 성공했습니다.",
      data: {
        id: 101,
        email: "leader@example.com",
        nickname: "팀장",
        profileImageUrl: null,
        provider: "LOCAL",
        createdAt: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // 이메일 중복체크
  apiMock.get("/users/exists", ({ request }) => {
    const url = new URL(request.url);
    const email = url.searchParams.get("email");

    if (email === "fronttest@test.com") {
      return HttpResponse.json({
        success: true,
        code: "SUCCESS",
        message: "이메일 중복 검사에 성공했습니다.",
        data: { exists: true },
        timestamp: new Date().toISOString(),
      });
    }

    return HttpResponse.json({
      success: true,
      code: "SUCCESS",
      message: "이메일 중복 검사에 성공했습니다.",
      data: { exists: false },
      timestamp: new Date().toISOString(),
    });
  }),

  apiMock.post(`/users`, async ({ request }) => {
    return HttpResponse.json(
      {
        success: true,
        code: "SUCCESS",
        message: "회원가입에 성공했습니다.",
        data: {
          id: 1,
          email: "",
          nickname: "",
          profileImageUrl: null,
          provider: "LOCAL",
          createdAt: new Date().toISOString(),
        },
        timestamp: new Date().toISOString(),
      },
      { status: 201 },
    );
  }),
];
