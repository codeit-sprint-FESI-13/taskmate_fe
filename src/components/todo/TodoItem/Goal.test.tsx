import { render, screen } from "@testing-library/react";

import { Goal } from "./Goal";

describe("TodoItem/Name 컴포넌트 테스트", () => {
  test("Goal 컴포넌트에 값이 제대로 렌더링 되는지 테스트", () => {
    // Arrange
    const goal = "Goal 컴포넌트 테스트";

    // Act
    render(<Goal>{goal}</Goal>);

    // Assert
    expect(screen.getByText("Goal 컴포넌트 테스트")).toBeInTheDocument();
  });
});
