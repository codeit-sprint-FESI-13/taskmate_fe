import { render, screen } from "@testing-library/react";

import { Loading } from "./Loading";

describe("TodoSection Loading 상태", () => {
  test("로딩 중 안내 문구가 표시된다", () => {
    render(<Loading />);
    expect(
      screen.getByText("할 일 목록을 불러오고 있어요"),
    ).toBeInTheDocument();
  });

  test("스피너가 렌더링된다", () => {
    render(<Loading />);
    expect(screen.getByLabelText("할 일 목록 로딩 중")).toBeInTheDocument();
  });
});
