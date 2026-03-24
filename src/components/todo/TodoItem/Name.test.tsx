import { render, screen } from "@testing-library/react";

import { Name } from "./Name";

describe("TodoItem/Name 컴포넌트 테스트", () => {
  test("Name 컴포넌트에 값이 제대로 렌더링 되는지 테스트", () => {
    render(<Name>Name 컴포넌트 테스트</Name>);
    expect(screen.getByText("Name 컴포넌트 테스트")).toBeInTheDocument();
  });
});
