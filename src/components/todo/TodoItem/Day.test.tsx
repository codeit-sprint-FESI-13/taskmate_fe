import { render, screen } from "@testing-library/react";

import { Day } from "./Day";

describe("TodoItem/Day 컴포넌트 테스트", () => {
  test("Day 컴포넌트에 값이 제대로 렌더링 되는지 테스트", () => {
    // Arrange
    const day = "D-5";

    // Act
    render(<Day color="blue">{day}</Day>);

    // Assert
    expect(screen.getByText("D-5")).toBeInTheDocument();
  });

  test("Day color 속성이 blue일때 색상이 제대로 적용되는지 테스트", () => {
    // Arrange
    const day = "D-5";

    // Act
    const { container } = render(<Day color="blue">{day}</Day>);

    // Assert
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("bg-blue-100", "text-blue-700");
  });

  test("Day color 속성이 red일때 색상이 제대로 적용되는지 테스트", () => {
    // Arrange
    const day = "D-5";

    // Act
    const { container } = render(<Day color="red">{day}</Day>);

    // Assert
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("bg-red-light", "text-red-normal");
  });
});
