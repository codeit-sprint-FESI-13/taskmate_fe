import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { Todo } from "@/entities/todo";

import { TodoDetailModal } from "./TodoDetailModal";

jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

jest.mock("@/shared/ui/Icon", () => ({
  Icon: ({ name }: { name: string }) => <span data-testid={`icon-${name}`} />,
}));

jest.mock("@/shared/assets/images/avatar.png", () => ({
  src: "/avatar-fallback.png",
}));

const makeTodo = (overrides: Partial<Todo> = {}): Todo => ({
  id: 1,
  goalId: 10,
  title: "컴포넌트 리팩토링",
  startDate: "2026-05-01",
  dueDate: "2026-05-31",
  status: "TODO",
  memo: "리팩토링 메모 내용",
  assigneeSummary: "홍길동",
  assignees: [{ userId: 101, nickname: "홍길동" }],
  ...overrides,
});

const defaultProps = {
  onClose: jest.fn(),
  todo: makeTodo(),
  goalName: "디자인 시스템 완성",
  teamName: "개인",
};

describe("TodoDetailModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("초기 렌더링", () => {
    test("할 일 제목을 표시한다", () => {
      render(<TodoDetailModal {...defaultProps} />);
      expect(screen.getByText("컴포넌트 리팩토링")).toBeInTheDocument();
    });

    test("팀 이름을 표시한다", () => {
      render(<TodoDetailModal {...defaultProps} />);
      expect(screen.getByText("개인")).toBeInTheDocument();
    });

    test("목표 이름을 표시한다", () => {
      render(<TodoDetailModal {...defaultProps} />);
      expect(screen.getByText("디자인 시스템 완성")).toBeInTheDocument();
    });

    test("시작 날짜를 표시한다", () => {
      render(<TodoDetailModal {...defaultProps} />);
      expect(screen.getByText("2026-05-01")).toBeInTheDocument();
    });

    test("마감 날짜를 표시한다", () => {
      render(<TodoDetailModal {...defaultProps} />);
      expect(screen.getByText("2026-05-31")).toBeInTheDocument();
    });

    test("메모를 표시한다", () => {
      render(<TodoDetailModal {...defaultProps} />);
      expect(screen.getByText("리팩토링 메모 내용")).toBeInTheDocument();
    });

    test("담당자 이름을 표시한다", () => {
      render(<TodoDetailModal {...defaultProps} />);
      expect(screen.getByText("홍길동")).toBeInTheDocument();
    });
  });

  describe("닫기 버튼", () => {
    test("클릭 시 onClose를 호출한다", async () => {
      render(<TodoDetailModal {...defaultProps} />);
      await userEvent.click(screen.getByRole("button", { name: "닫기" }));
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("담당자가 여러 명인 경우", () => {
    test("모든 담당자 이름을 표시한다", () => {
      render(
        <TodoDetailModal
          {...defaultProps}
          todo={makeTodo({
            assignees: [
              { userId: 101, nickname: "홍길동" },
              { userId: 102, nickname: "김철수" },
            ],
          })}
        />,
      );

      expect(screen.getByText("홍길동")).toBeInTheDocument();
      expect(screen.getByText("김철수")).toBeInTheDocument();
    });
  });

  describe("담당자가 없는 경우", () => {
    test("담당자 이름을 표시하지 않는다", () => {
      render(
        <TodoDetailModal
          {...defaultProps}
          todo={makeTodo({ assignees: [], assigneeSummary: "" })}
        />,
      );

      expect(screen.queryByText("홍길동")).not.toBeInTheDocument();
    });
  });
});
