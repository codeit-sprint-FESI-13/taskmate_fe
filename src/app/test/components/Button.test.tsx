// (예시) 컴포넌트 테스트
import { render, screen } from "@testing-library/react";

import { ExampleButton } from "./Button";

test("예시 버튼이 존재하는지?", () => {
  // 준비
  render(<ExampleButton />);

  // 검증
  const button = screen.getByRole("button", { name: "예시 버튼" });

  // 실행
  expect(button).toBeInTheDocument();
});
