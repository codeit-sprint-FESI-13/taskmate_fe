import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { Todo } from "@/entities/todo";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";

import { TodoColumnList } from "./TodoColumnList";

jest.mock("@/shared/hooks/useInfiniteScroll", () => ({
  useInfiniteScroll: jest.fn(),
}));

jest.mock("@/features/todo/hooks/useTodoCreateModal", () => ({
  useTodoCreateModal: () => ({ openTodoCreateModal: jest.fn() }),
}));

jest.mock("@/features/todo/hooks/useTodoDeleteModal", () => ({
  useTodoDeleteModal: () => ({ openTodoDeleteModal: jest.fn() }),
}));

jest.mock("@/features/todo/hooks/useTodoDetailModal", () => ({
  useTodoDetailModal: () => ({ openTodoDetailModal: jest.fn() }),
}));

jest.mock("@/features/todo/mutation/usePatchTodoStatusMutation", () => ({
  usePatchTodoStatusMutation: () => ({ mutate: jest.fn(), isPending: false }),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img
      src={src}
      alt={alt}
    />
  ),
}));

jest.mock("@/shared/assets/images/avatar.png", () => ({ src: "/avatar.png" }));

jest.mock("@/shared/ui/Icon", () => ({
  Icon: ({ name }: { name: string }) => <span data-testid={`icon-${name}`} />,
}));

const mockUseInfiniteScroll = useInfiniteScroll as jest.MockedFunction<
  typeof useInfiniteScroll
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

const defaultProps = {
  goalId: "1",
  keyword: "",
  isMyTodo: false,
};

beforeEach(() => {
  mockUseInfiniteScroll.mockReturnValue({
    ref: { current: null },
    data: { pages: [{ items: [] }] },
    isFetchingNextPage: false,
  } as ReturnType<typeof useInfiniteScroll>);
});

describe("TodoColumnList", () => {
  describe("컬럼 이름 렌더링", () => {
    test("status가 TODO이면 'TODO' 헤딩이 표시된다", () => {
      render(
        <TodoColumnList
          status="TODO"
          {...defaultProps}
        />,
      );
      expect(screen.getByRole("heading", { name: "TODO" })).toBeInTheDocument();
    });

    test("status가 DOING이면 'DOING' 헤딩이 표시된다", () => {
      render(
        <TodoColumnList
          status="DOING"
          {...defaultProps}
        />,
      );
      expect(
        screen.getByRole("heading", { name: "DOING" }),
      ).toBeInTheDocument();
    });

    test("status가 DONE이면 'DONE' 헤딩이 표시된다", () => {
      render(
        <TodoColumnList
          status="DONE"
          {...defaultProps}
        />,
      );
      expect(screen.getByRole("heading", { name: "DONE" })).toBeInTheDocument();
    });
  });

  describe("기본 정렬 레이블", () => {
    test("TODO 컬럼의 기본 정렬은 '마감일 순'이다", () => {
      render(
        <TodoColumnList
          status="TODO"
          {...defaultProps}
        />,
      );
      expect(screen.getByText("마감일 순")).toBeInTheDocument();
    });

    test("DOING 컬럼의 기본 정렬은 '최신순'이다", () => {
      render(
        <TodoColumnList
          status="DOING"
          {...defaultProps}
        />,
      );
      expect(screen.getByText("최신순")).toBeInTheDocument();
    });

    test("DONE 컬럼의 기본 정렬은 '오래된순'이다", () => {
      render(
        <TodoColumnList
          status="DONE"
          {...defaultProps}
        />,
      );
      expect(screen.getByText("오래된순")).toBeInTheDocument();
    });
  });

  describe("할 일 추가 버튼", () => {
    test("TODO 컬럼에는 '할 일 추가' 버튼이 표시된다", () => {
      render(
        <TodoColumnList
          status="TODO"
          {...defaultProps}
        />,
      );
      expect(
        screen.getByRole("button", { name: "할 일 추가" }),
      ).toBeInTheDocument();
    });

    test("DOING 컬럼에는 '할 일 추가' 버튼이 표시되지 않는다", () => {
      render(
        <TodoColumnList
          status="DOING"
          {...defaultProps}
        />,
      );
      expect(
        screen.queryByRole("button", { name: "할 일 추가" }),
      ).not.toBeInTheDocument();
    });

    test("DONE 컬럼에는 '할 일 추가' 버튼이 표시되지 않는다", () => {
      render(
        <TodoColumnList
          status="DONE"
          {...defaultProps}
        />,
      );
      expect(
        screen.queryByRole("button", { name: "할 일 추가" }),
      ).not.toBeInTheDocument();
    });
  });

  describe("할일 목록 렌더링", () => {
    test("페이지에 할일이 있으면 해당 제목이 표시된다", () => {
      const todo1 = makeTodo({ id: 1, title: "첫 번째 할 일" });
      const todo2 = makeTodo({ id: 2, title: "두 번째 할 일" });

      mockUseInfiniteScroll.mockReturnValue({
        ref: { current: null },
        data: { pages: [{ items: [todo1, todo2] }] },
        isFetchingNextPage: false,
      } as ReturnType<typeof useInfiniteScroll>);

      render(
        <TodoColumnList
          status="TODO"
          {...defaultProps}
        />,
      );

      expect(screen.getByText("첫 번째 할 일")).toBeInTheDocument();
      expect(screen.getByText("두 번째 할 일")).toBeInTheDocument();
    });

    test("여러 페이지에 걸친 할일이 모두 표시된다", () => {
      const todo1 = makeTodo({ id: 1, title: "페이지1 할 일" });
      const todo2 = makeTodo({ id: 2, title: "페이지2 할 일" });

      mockUseInfiniteScroll.mockReturnValue({
        ref: { current: null },
        data: { pages: [{ items: [todo1] }, { items: [todo2] }] },
        isFetchingNextPage: false,
      } as ReturnType<typeof useInfiniteScroll>);

      render(
        <TodoColumnList
          status="TODO"
          {...defaultProps}
        />,
      );

      expect(screen.getByText("페이지1 할 일")).toBeInTheDocument();
      expect(screen.getByText("페이지2 할 일")).toBeInTheDocument();
    });

    test("할일이 없으면 할일 제목이 표시되지 않는다", () => {
      render(
        <TodoColumnList
          status="TODO"
          {...defaultProps}
        />,
      );

      expect(screen.queryByText("테스트 할 일")).not.toBeInTheDocument();
    });
  });

  describe("정렬 변경", () => {
    test("정렬 버튼 클릭 시 정렬 옵션 드롭다운이 열린다", async () => {
      render(
        <TodoColumnList
          status="TODO"
          {...defaultProps}
        />,
      );

      await userEvent.click(screen.getByText("마감일 순"));

      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    test("TODO 컬럼에서 다른 정렬 옵션 선택 시 선택된 정렬이 변경된다", async () => {
      render(
        <TodoColumnList
          status="TODO"
          {...defaultProps}
        />,
      );

      await userEvent.click(screen.getByText("마감일 순"));
      const listbox = screen.getByRole("listbox");
      await userEvent.click(within(listbox).getByText("최신순"));

      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "최신순" }),
      ).toBeInTheDocument();
    });

    test("DOING 컬럼에서 '마감일 순'으로 정렬 변경 시 반영된다", async () => {
      render(
        <TodoColumnList
          status="DOING"
          {...defaultProps}
        />,
      );

      await userEvent.click(screen.getByText("최신순"));
      const listbox = screen.getByRole("listbox");
      await userEvent.click(within(listbox).getByText("마감일 순"));

      expect(
        screen.getByRole("button", { name: "마감일 순" }),
      ).toBeInTheDocument();
    });
  });
});
