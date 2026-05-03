import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Error as ListError } from "./Error";

jest.mock("@/shared/ui/Icon", () => ({
  Icon: ({ name }: { name: string }) => <span data-testid={`icon-${name}`} />,
}));

describe("TodoSection Error 상태", () => {
  const error = new Error("서버 오류가 발생했습니다");
  const onReset = jest.fn();

  beforeEach(() => {
    onReset.mockClear();
  });

  test("에러 안내 문구가 표시된다", () => {
    render(
      <ListError
        error={error}
        onReset={onReset}
      />,
    );
    expect(
      screen.getByText("할 일 목록을 불러오지 못했어요"),
    ).toBeInTheDocument();
  });

  test("전달된 에러 메시지가 표시된다", () => {
    render(
      <ListError
        error={error}
        onReset={onReset}
      />,
    );
    expect(screen.getByText("서버 오류가 발생했습니다")).toBeInTheDocument();
  });

  test("'다시 요청하기' 버튼이 표시된다", () => {
    render(
      <ListError
        error={error}
        onReset={onReset}
      />,
    );
    expect(screen.getByText("다시 요청하기")).toBeInTheDocument();
  });

  test("'다시 요청하기' 버튼 클릭 시 onReset이 호출된다", async () => {
    render(
      <ListError
        error={error}
        onReset={onReset}
      />,
    );
    await userEvent.click(screen.getByText("다시 요청하기"));
    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
