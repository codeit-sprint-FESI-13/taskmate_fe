import { render, screen } from "@testing-library/react";

import GoalInfoLoading from "./GoalInfoLoading";

describe("GoalInfoLoading", () => {
  test("로딩 스피너를 렌더링한다", () => {
    render(<GoalInfoLoading />);

    expect(screen.getByLabelText("로딩 중")).toBeInTheDocument();
  });
});
