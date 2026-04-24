import { render, screen } from "@testing-library/react";

import { Team } from "./Team";

describe("TodoItem/Team 컴포넌트 테스트", () => {
  test("Team 컴포넌트에 값이 제대로 렌더링 되는지 테스트", () => {
    // Arrange
    const team = "Team 1";

    // Act
    render(<Team>{team}</Team>);

    // Assert
    expect(screen.getByText("Team 1")).toBeInTheDocument();
  });
});
