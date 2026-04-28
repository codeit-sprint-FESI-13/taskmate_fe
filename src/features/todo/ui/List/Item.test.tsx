import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { Todo } from "@/entities/todo";
import { useTodoDeleteModal } from "@/features/todo/hooks/useTodoDeleteModal";
import { useTodoDetailModal } from "@/features/todo/hooks/useTodoDetailModal";

import { Item } from "./Item";

jest.mock("@/features/todo/hooks/useTodoDeleteModal", () => ({
  useTodoDeleteModal: jest.fn(),
}));

jest.mock("@/features/todo/hooks/useTodoDetailModal", () => ({
  useTodoDetailModal: jest.fn(),
}));

jest.mock("@/features/todo/utils/formatDDay", () => ({
  formatDDay: (dueDate: string) => `D-test(${dueDate})`,
}));

jest.mock("@/shared/ui/Icon", () => ({
  Icon: ({ name }: { name: string }) => <span data-testid={`icon-${name}`} />,
}));

jest.mock("./TodoAssigneeAvatars", () => ({
  TodoAssigneeAvatars: () => <div data-testid="assignee-avatars" />,
}));

jest.mock("./TodoStatusSelect", () => ({
  TodoStatusSelect: () => <div data-testid="todo-status-select" />,
}));

const mockOpenTodoDeleteModal = jest.fn();
const mockOpenTodoDetailModal = jest.fn();

const mockUseTodoDeleteModal = useTodoDeleteModal as jest.MockedFunction<
  typeof useTodoDeleteModal
>;
const mockUseTodoDetailModal = useTodoDetailModal as jest.MockedFunction<
  typeof useTodoDetailModal
>;

const makeTodo = (overrides: Partial<Todo> = {}): Todo => ({
  id: 1,
  goalId: 100,
  title: "테스트 할 일",
  startDate: "2026-04-01",
  dueDate: "2026-12-31",
  status: "TODO",
  memo: "",
  assigneeSummary: "",
  assignees: [],
  ...overrides,
});

describe("Item", () => {
  beforeEach(() => {
    mockOpenTodoDeleteModal.mockClear();
    mockOpenTodoDetailModal.mockClear();

    mockUseTodoDeleteModal.mockReturnValue({
      openTodoDeleteModal: mockOpenTodoDeleteModal,
      closeTodoDeleteModal: jest.fn(),
    });
    mockUseTodoDetailModal.mockReturnValue({
      openTodoDetailModal: mockOpenTodoDetailModal,
      closeTodoDetailModal: jest.fn(),
    });
  });

  describe("초기 렌더링", () => {
    test("할 일 제목이 표시된다", () => {
      render(<Item todo={makeTodo({ title: "오늘 할 일" })} />);
      expect(screen.getByText("오늘 할 일")).toBeInTheDocument();
    });

    test("formatDDay로 포맷된 마감일이 표시된다", () => {
      render(<Item todo={makeTodo({ dueDate: "2026-12-31" })} />);
      expect(screen.getByText("D-test(2026-12-31)")).toBeInTheDocument();
    });

    test("상태 셀렉트가 렌더링된다", () => {
      render(<Item todo={makeTodo()} />);
      expect(screen.getByTestId("todo-status-select")).toBeInTheDocument();
    });

    test("담당자 아바타 영역이 렌더링된다", () => {
      render(<Item todo={makeTodo()} />);
      expect(screen.getByTestId("assignee-avatars")).toBeInTheDocument();
    });

    test("삭제 아이콘 버튼이 렌더링된다", () => {
      render(<Item todo={makeTodo()} />);
      expect(screen.getByTestId("icon-Trash")).toBeInTheDocument();
    });
  });

  describe("인터랙션", () => {
    test("아이템 영역 클릭 시 openTodoDetailModal이 호출된다", async () => {
      render(<Item todo={makeTodo({ title: "클릭할 할 일" })} />);
      await userEvent.click(screen.getByText("클릭할 할 일"));
      expect(mockOpenTodoDetailModal).toHaveBeenCalledTimes(1);
    });

    test("삭제 버튼 클릭 시 openTodoDeleteModal이 호출된다", async () => {
      render(<Item todo={makeTodo()} />);
      await userEvent.click(screen.getByRole("button"));
      expect(mockOpenTodoDeleteModal).toHaveBeenCalledTimes(1);
    });

    test("삭제 버튼 클릭 시 이벤트가 부모로 전파되지 않아 openTodoDetailModal이 호출되지 않는다", async () => {
      render(<Item todo={makeTodo()} />);
      await userEvent.click(screen.getByRole("button"));
      expect(mockOpenTodoDetailModal).not.toHaveBeenCalled();
    });
  });
});
