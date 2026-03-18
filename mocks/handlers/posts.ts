import { HttpResponse } from "msw";

import { apiMock } from "@/mocks/apiMock";

export const postsHandlers = [
  apiMock.get("*/posts/:id", ({ params }) => {
    return HttpResponse.json({
      id: Number(params.id),
      title: "첫 번째 게시글",
      body: "내용 1",
    });
  }),
];
