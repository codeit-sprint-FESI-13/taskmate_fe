import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SummaryError from "./Error";

describe("SummaryError", () => {
  test("고정 안내 문구를 렌더링한다", () => {
    render(
      <SummaryError
        error={new Error("오류")}
        onReset={jest.fn()}
      />,
    );

    expect(
      screen.getByText("팀 요약 정보를 불러오지 못했어요"),
    ).toBeInTheDocument();
  });

  test("error.message가 있을 때 해당 메시지를 표시한다", () => {
    render(
      <SummaryError
        error={new Error("네트워크 오류가 발생했습니다")}
        onReset={jest.fn()}
      />,
    );

    expect(
      screen.getByText("네트워크 오류가 발생했습니다"),
    ).toBeInTheDocument();
  });

  test("error.message가 없을 때 폴백 메시지를 표시한다", () => {
    render(
      <SummaryError
        error={new Error("")}
        onReset={jest.fn()}
      />,
    );

    expect(screen.getByText("잠시 후 다시 시도해주세요.")).toBeInTheDocument();
  });

  test("다시 시도 버튼 클릭 시 onReset이 호출된다", async () => {
    const onReset = jest.fn();
    render(
      <SummaryError
        error={new Error("오류")}
        onReset={onReset}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "다시 시도" }));

    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
