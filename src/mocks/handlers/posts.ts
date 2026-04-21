import { HttpResponse } from "msw";

import { apiMock } from "@/shared/mock/apiMock";

export const postsHandlers = [
  apiMock.get("*/posts/:id", ({ request, params }) => {
    // 1. 헤더에 토큰이 없으면 401 던지기
    const authHeader = request.headers.get("Authorization");

    if (!authHeader) {
      return new HttpResponse(null, { status: 401 });
    }

    // 2. id 500으로 요청하면 500 던지기
    if (params.id === "500") {
      return new HttpResponse(null, { status: 500 });
    }

    // 3. 정상 응답
    return HttpResponse.json({
      id: Number(params.id),
      title: `${params.id}번 게시글`,
      body: "내용입니다.",
    });
  }),
];
