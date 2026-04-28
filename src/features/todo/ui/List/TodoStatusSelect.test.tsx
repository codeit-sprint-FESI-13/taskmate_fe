import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { Todo } from "@/entities/todo";
import { usePatchTodoStatusMutation } from "@/features/todo/mutation/usePatchTodoStatusMutation";

import { TodoStatusSelect } from "./TodoStatusSelect";

jest.mock("@/features/todo/mutation/usePatchTodoStatusMutation", () => ({
  usePatchTodoStatusMutation: jest.fn(),
}));

jest.mock("@/shared/ui/Icon", () => ({
  Icon: ({ name }: { name: string }) => <span data-testid={`icon-${name}`} />,
}));

const mockMutate = jest.fn();
const mockUsePatchTodoStatusMutation =
  usePatchTodoStatusMutation as jest.MockedFunction<
    typeof usePatchTodoStatusMutation
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

describe("TodoStatusSelect", () => {
  beforeEach(() => {
    mockMutate.mockClear();
    mockUsePatchTodoStatusMutation.mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    } as unknown as ReturnType<typeof usePatchTodoStatusMutation>);
  });

  describe("초기 렌더링", () => {
    test("현재 상태 배지가 표시된다", () => {
      render(<TodoStatusSelect todo={makeTodo({ status: "TODO" })} />);
      expect(screen.getByText("TODO")).toBeInTheDocument();
    });

    test("DOING 상태의 배지가 표시된다", () => {
      render(<TodoStatusSelect todo={makeTodo({ status: "DOING" })} />);
      expect(screen.getByText("DOING")).toBeInTheDocument();
    });

    test("초기에 드롭다운이 닫혀 있다", () => {
      render(<TodoStatusSelect todo={makeTodo({ status: "TODO" })} />);
      expect(screen.queryByText("DONE")).not.toBeInTheDocument();
    });
  });

  describe("드롭다운 열기", () => {
    test("배지 버튼 클릭 시 모든 상태 옵션이 표시된다", async () => {
      render(<TodoStatusSelect todo={makeTodo({ status: "TODO" })} />);
      await userEvent.click(screen.getByRole("button"));
      expect(screen.getByText("DOING")).toBeInTheDocument();
      expect(screen.getByText("DONE")).toBeInTheDocument();
    });
  });

  describe("상태 변경", () => {
    test("DOING 선택 시 patchTodoStatus가 DOING 상태로 호출된다", async () => {
      const todo = makeTodo({
        id: 1,
        goalId: 100,
        status: "TODO",
        assignees: [{ userId: 5, nickname: "홍길동" }],
      });
      render(<TodoStatusSelect todo={todo} />);
      await userEvent.click(screen.getByRole("button"));

      const doingText = screen.getByText("DOING");
      await userEvent.click(doingText.closest("button")!);

      expect(mockMutate).toHaveBeenCalledWith(
        expect.objectContaining({
          goalId: "100",
          todoId: "1",
          todoData: expect.objectContaining({
            status: "DOING",
            assigneeIds: [5],
          }),
        }),
      );
    });

    test("DONE 선택 시 patchTodoStatus가 DONE 상태로 호출된다", async () => {
      render(<TodoStatusSelect todo={makeTodo({ status: "TODO" })} />);
      await userEvent.click(screen.getByRole("button"));

      const doneText = screen.getByText("DONE");
      await userEvent.click(doneText.closest("button")!);

      expect(mockMutate).toHaveBeenCalledWith(
        expect.objectContaining({
          todoData: expect.objectContaining({ status: "DONE" }),
        }),
      );
    });
  });

  describe("isPending 상태", () => {
    test("isPending이 true이면 옵션 버튼이 disabled 처리된다", async () => {
      mockUsePatchTodoStatusMutation.mockReturnValue({
        mutate: mockMutate,
        isPending: true,
      } as unknown as ReturnType<typeof usePatchTodoStatusMutation>);

      render(<TodoStatusSelect todo={makeTodo({ status: "TODO" })} />);
      await userEvent.click(screen.getByRole("button"));

      const allButtons = screen.getAllByRole("button");
      const optionButtons = allButtons.slice(1);
      optionButtons.forEach((btn) => {
        expect(btn).toBeDisabled();
      });
    });
  });

  describe("이벤트 전파 차단", () => {
    test("상태 셀렉트 컨테이너 클릭이 부모로 전파되지 않는다", async () => {
      const parentClick = jest.fn();
      render(
        <div onClick={parentClick}>
          <TodoStatusSelect todo={makeTodo()} />
        </div>,
      );
      await userEvent.click(screen.getByRole("button"));
      expect(parentClick).not.toHaveBeenCalled();
    });
  });
});
