import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { useCreateTodoForm } from "@/features/todo/hooks/useCreateTodoForm";
import { useGoalId } from "@/shared/hooks/useGoalId";

import { TodoCreateModal } from "./TodoCreateModal";

jest.mock("@/shared/hooks/useGoalId");
jest.mock("@/features/todo/hooks/useCreateTodoForm");
jest.mock("./AssigneeSelect", () => ({
  AssigneeSelect: () => <div data-testid="assignee-select" />,
}));

const mockUseGoalId = useGoalId as jest.MockedFunction<typeof useGoalId>;
const mockUseCreateTodoForm = useCreateTodoForm as jest.MockedFunction<
  typeof useCreateTodoForm
>;

const defaultFormState = {
  assigneeIds: [],
  setAssigneeIds: jest.fn(),
  startDate: "",
  handleStartDateChange: jest.fn(),
  handleSubmit: jest.fn((e) => e.preventDefault()),
  isPending: false,
};

const defaultProps = {
  onClose: jest.fn(),
  goalName: "디자인 시스템 완성",
  teamName: "개인",
  memberList: [],
  isAssigneeFixed: true,
  fixedAssigneeNickname: "나",
  initialAssigneeIds: [],
};

describe("TodoCreateModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseGoalId.mockReturnValue("1");
    mockUseCreateTodoForm.mockReturnValue(defaultFormState);
  });

  describe("초기 렌더링", () => {
    test("목표 이름을 표시한다", () => {
      render(<TodoCreateModal {...defaultProps} />);
      expect(screen.getAllByText("디자인 시스템 완성").length).toBeGreaterThan(
        0,
      );
    });

    test("팀 이름을 표시한다", () => {
      render(<TodoCreateModal {...defaultProps} />);
      expect(screen.getByText("개인")).toBeInTheDocument();
    });

    test("취소 버튼을 표시한다", () => {
      render(<TodoCreateModal {...defaultProps} />);
      expect(screen.getByRole("button", { name: "취소" })).toBeInTheDocument();
    });

    test("할일 생성 버튼을 표시한다", () => {
      render(<TodoCreateModal {...defaultProps} />);
      expect(
        screen.getByRole("button", { name: "할일 생성" }),
      ).toBeInTheDocument();
    });
  });

  describe("개인 목표 (isAssigneeFixed=true)", () => {
    test("고정 담당자 닉네임을 표시한다", () => {
      render(
        <TodoCreateModal
          {...defaultProps}
          isAssigneeFixed={true}
          fixedAssigneeNickname="홍길동"
        />,
      );

      expect(screen.getByText("홍길동")).toBeInTheDocument();
    });

    test("fixedAssigneeNickname이 없으면 '나'를 표시한다", () => {
      render(
        <TodoCreateModal
          {...defaultProps}
          isAssigneeFixed={true}
          fixedAssigneeNickname={undefined}
        />,
      );

      expect(screen.getByText("나")).toBeInTheDocument();
    });

    test("AssigneeSelect를 렌더링하지 않는다", () => {
      render(
        <TodoCreateModal
          {...defaultProps}
          isAssigneeFixed={true}
        />,
      );
      expect(screen.queryByTestId("assignee-select")).not.toBeInTheDocument();
    });
  });

  describe("팀 목표 (isAssigneeFixed=false)", () => {
    test("AssigneeSelect를 렌더링한다", () => {
      render(
        <TodoCreateModal
          {...defaultProps}
          isAssigneeFixed={false}
        />,
      );
      expect(screen.getByTestId("assignee-select")).toBeInTheDocument();
    });
  });

  describe("취소 버튼", () => {
    test("클릭 시 onClose를 호출한다", async () => {
      render(<TodoCreateModal {...defaultProps} />);
      await userEvent.click(screen.getByRole("button", { name: "취소" }));
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("isPending 상태", () => {
    test("isPending=true이면 할일 생성 버튼이 비활성화된다", () => {
      mockUseCreateTodoForm.mockReturnValue({
        ...defaultFormState,
        isPending: true,
      });

      render(<TodoCreateModal {...defaultProps} />);

      const submitBtn = screen.getByRole("button", { name: "할일 생성" });
      expect(submitBtn).toHaveClass("pointer-events-none");
    });

    test("isPending=false이면 할일 생성 버튼이 활성화된다", () => {
      mockUseCreateTodoForm.mockReturnValue({
        ...defaultFormState,
        isPending: false,
      });

      render(<TodoCreateModal {...defaultProps} />);

      const submitBtn = screen.getByRole("button", { name: "할일 생성" });
      expect(submitBtn).not.toHaveClass("pointer-events-none");
    });
  });
});
