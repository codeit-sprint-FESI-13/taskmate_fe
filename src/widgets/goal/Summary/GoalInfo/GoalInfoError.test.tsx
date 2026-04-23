import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import GoalInfoError from "./GoalInfoError";

describe("GoalInfoError", () => {
  test("에러 메시지를 렌더링한다", () => {
    const error = new Error("목표 정보를 불러오지 못했습니다.");

    render(
      <GoalInfoError
        error={error}
        onReset={() => {}}
      />,
    );

    expect(
      screen.getByText("목표 정보를 불러오지 못했습니다."),
    ).toBeInTheDocument();
  });

  test("다시 요청하기 버튼 클릭 시 onReset이 호출된다", async () => {
    const onReset = jest.fn();

    render(
      <GoalInfoError
        error={new Error("오류")}
        onReset={onReset}
      />,
    );

    await userEvent.click(
      screen.getByRole("button", { name: "다시 요청하기" }),
    );

    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
