import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TodoSection } from ".";

jest.mock("@/shared/hooks/useGoalId", () => ({
  useGoalId: jest.fn().mockReturnValue("1"),
}));

jest.mock("@/shared/hooks/useBreakpoint", () => ({
  useBreakpoint: jest.fn().mockReturnValue("desktop"),
}));

const mockOnKeywordChange = jest.fn();

jest.mock("@/shared/hooks/useDebouncedKeyword", () => ({
  useDebouncedKeyword: () => ({
    keywordInput: "",
    keyword: "검색어",
    onKeywordChange: mockOnKeywordChange,
  }),
}));

type CapturedProps = {
  status: string;
  goalId: string;
  keyword: string;
  isMyTodo: boolean;
};
const capturedProps: CapturedProps[] = [];

jest.mock("./TodoColumnList", () => ({
  TodoColumnList: (props: CapturedProps) => {
    capturedProps.push(props);
    return <div data-testid={`todo-column-${props.status}`} />;
  },
}));

jest.mock("@/shared/ui/AsyncBoundary", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("@/shared/ui/Icon", () => ({
  Icon: ({ name }: { name: string }) => <span data-testid={`icon-${name}`} />,
}));

beforeEach(() => {
  capturedProps.length = 0;
});

describe("TodoSection", () => {
  describe("초기 렌더링", () => {
    test("검색 인풋이 렌더링된다", () => {
      render(<TodoSection />);
      expect(
        screen.getByPlaceholderText("할 일을 이름으로 검색해보세요."),
      ).toBeInTheDocument();
    });

    test("'내 할일만 보기' 레이블이 표시된다", () => {
      render(<TodoSection />);
      expect(screen.getByText("내 할일만 보기")).toBeInTheDocument();
    });

    test("TODO, DOING, DONE 세 컬럼이 렌더링된다", () => {
      render(<TodoSection />);
      expect(screen.getByTestId("todo-column-TODO")).toBeInTheDocument();
      expect(screen.getByTestId("todo-column-DOING")).toBeInTheDocument();
      expect(screen.getByTestId("todo-column-DONE")).toBeInTheDocument();
    });
  });

  describe("'내 할일만 보기' 토글", () => {
    test("초기에 토글이 비활성화 상태이다", () => {
      render(<TodoSection />);
      expect(screen.getByRole("button")).toHaveClass("bg-gray-300");
    });

    test("토글 클릭 시 활성화 상태로 전환된다", async () => {
      render(<TodoSection />);
      const toggle = screen.getByRole("button");
      await userEvent.click(toggle);
      expect(toggle).toHaveClass("bg-blue-800");
    });

    test("토글을 두 번 클릭하면 비활성화 상태로 돌아온다", async () => {
      render(<TodoSection />);
      const toggle = screen.getByRole("button");
      await userEvent.click(toggle);
      await userEvent.click(toggle);
      expect(toggle).toHaveClass("bg-gray-300");
    });
  });

  describe("검색 인풋", () => {
    test("검색어 입력 시 onKeywordChange가 호출된다", async () => {
      render(<TodoSection />);
      const input =
        screen.getByPlaceholderText("할 일을 이름으로 검색해보세요.");
      await userEvent.type(input, "테스트");
      expect(mockOnKeywordChange).toHaveBeenCalled();
    });
  });

  describe("TodoColumnList 로 props 전파", () => {
    test("세 컬럼 모두 useGoalId에서 반환된 goalId를 전달받는다", () => {
      render(<TodoSection />);
      const columns = capturedProps.filter((p) =>
        ["TODO", "DOING", "DONE"].includes(p.status),
      );
      expect(columns).toHaveLength(3);
      columns.forEach((p) => expect(p.goalId).toBe("1"));
    });

    test("세 컬럼 모두 useDebouncedKeyword에서 반환된 keyword를 전달받는다", () => {
      render(<TodoSection />);
      capturedProps
        .filter((p) => ["TODO", "DOING", "DONE"].includes(p.status))
        .forEach((p) => expect(p.keyword).toBe("검색어"));
    });

    test("초기에 세 컬럼 모두 isMyTodo=false를 전달받는다", () => {
      render(<TodoSection />);
      capturedProps
        .filter((p) => ["TODO", "DOING", "DONE"].includes(p.status))
        .forEach((p) => expect(p.isMyTodo).toBe(false));
    });

    test("토글 클릭 후 세 컬럼 모두 isMyTodo=true를 전달받는다", async () => {
      render(<TodoSection />);
      await userEvent.click(screen.getByRole("button"));
      const latest = ["TODO", "DOING", "DONE"].map(
        (status) => capturedProps.filter((p) => p.status === status).at(-1)!,
      );
      latest.forEach((p) => expect(p.isMyTodo).toBe(true));
    });
  });
});
