import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";

import { server } from "@/mocks/server";

import Home from "./page";

describe("Home Page (MSW Integration)", () => {
  test("성공 시 MSW로부터 받은 게시글 상세 데이터를 화면에 렌더링한다", async () => {
    // 테스트 실행 직전에 성공 핸들러를 주입
    server.use(
      http.get("*/posts/1", () => {
        return HttpResponse.json({
          id: 1,
          title: "첫 번째 게시글",
          body: "MSW에서 보낸 테스트 데이터입니다.",
        });
      }),
    );

    render(<Home />);

    const postItem = await screen.findByText(/첫 번째 게시글/i);
    expect(postItem).toBeInTheDocument();
  });

  test("401 에러 발생 시 적절한 에러 메시지를 표시한다", async () => {
    // 에러 상황 강제 주입
    server.use(
      http.get("*/posts/1", () => {
        return new HttpResponse(null, { status: 401 });
      }),
    );

    render(<Home />);

    const errorMessage =
      await screen.findByText(/로그인이 필요한 서비스입니다/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
