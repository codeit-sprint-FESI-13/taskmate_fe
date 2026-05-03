import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Empty } from "./Empty";

const mockOpenTodoCreateModal = jest.fn();

jest.mock("@/features/todo/hooks/useTodoCreateModal", () => ({
  useTodoCreateModal: () => ({
    openTodoCreateModal: mockOpenTodoCreateModal,
    closeTodoCreateModal: jest.fn(),
  }),
}));

jest.mock("@/shared/ui/Icon", () => ({
  Icon: ({ name }: { name: string }) => <span data-testid={`icon-${name}`} />,
}));

describe("TodoSection Empty 상태", () => {
  beforeEach(() => {
    mockOpenTodoCreateModal.mockClear();
  });

  test("빈 상태 안내 문구가 표시된다", () => {
    render(<Empty />);
    expect(screen.getByText("생성된 할 일이 없어요")).toBeInTheDocument();
    expect(
      screen.getByText("새로운 할 일을 만들고 관리해보세요"),
    ).toBeInTheDocument();
  });

  test("'할 일 추가' 버튼이 표시된다", () => {
    render(<Empty />);
    expect(screen.getByText("할 일 추가")).toBeInTheDocument();
  });

  test("'할 일 추가' 버튼 클릭 시 openTodoCreateModal이 호출된다", async () => {
    render(<Empty />);
    await userEvent.click(screen.getByText("할 일 추가"));
    expect(mockOpenTodoCreateModal).toHaveBeenCalledTimes(1);
  });
});
