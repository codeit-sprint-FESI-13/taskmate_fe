import { render, screen } from "@testing-library/react";

import Home from "./page";

describe("MSW 모킹 테스트", () => {
  test("MSW 상세 데이터 모킹", async () => {
    render(<Home />);

    const postItem = await screen.findByText("1: 첫 번째 게시글");

    // MSW에서 설정한 결과값이 화면에 잘 나오는지 확인
    expect(postItem).toBeInTheDocument();
  });
});
