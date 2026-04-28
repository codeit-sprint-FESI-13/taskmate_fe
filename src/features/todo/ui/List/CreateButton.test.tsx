import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CreateButton } from "./CreateButton";

const mockOpenTodoCreateModal = jest.fn();

jest.mock("@/features/todo/hooks/useTodoCreateModal", () => ({
  useTodoCreateModal: () => ({
    openTodoCreateModal: mockOpenTodoCreateModal,
  }),
}));

jest.mock("@/shared/ui/Icon", () => ({
  Icon: ({ name }: { name: string }) => <span data-testid={`icon-${name}`} />,
}));

describe("CreateButton", () => {
  beforeEach(() => {
    mockOpenTodoCreateModal.mockClear();
  });

  test("'할 일 추가' 버튼이 렌더링된다", () => {
    render(<CreateButton />);
    expect(screen.getByText("할 일 추가")).toBeInTheDocument();
  });

  test("버튼 클릭 시 openTodoCreateModal이 호출된다", async () => {
    render(<CreateButton />);
    await userEvent.click(screen.getByRole("button", { name: /할 일 추가/i }));
    expect(mockOpenTodoCreateModal).toHaveBeenCalledTimes(1);
  });
});
