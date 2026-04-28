import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TodoList } from "./index";

jest.mock("@/shared/ui/Spacing", () => ({
  Spacing: () => null,
}));

jest.mock("./Order", () => ({
  Order: ({
    selected,
    onSelect,
    options,
  }: {
    selected: string;
    onSelect: (v: string) => void;
    options: string[];
  }) => (
    <div>
      <span data-testid="order-selected">{selected}</span>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  ),
}));

describe("TodoList.List", () => {
  const onSortChange = jest.fn();

  const defaultProps = {
    name: "TODO",
    height: "728px",
    sortOptions: ["마감일 순", "최신순", "오래된순"],
    selectedSort: "마감일 순",
    onSortChange,
  };

  beforeEach(() => {
    onSortChange.mockClear();
  });

  describe("초기 렌더링", () => {
    test("name이 헤딩으로 표시된다", () => {
      render(
        <TodoList.List {...defaultProps}>
          <li>아이템</li>
        </TodoList.List>,
      );
      expect(screen.getByRole("heading", { name: "TODO" })).toBeInTheDocument();
    });

    test("선택된 정렬 옵션이 Order에 전달된다", () => {
      render(
        <TodoList.List {...defaultProps}>
          <li>아이템</li>
        </TodoList.List>,
      );
      expect(screen.getByTestId("order-selected")).toHaveTextContent(
        "마감일 순",
      );
    });

    test("children이 목록에 렌더링된다", () => {
      render(
        <TodoList.List {...defaultProps}>
          <li>아이템 1</li>
          <li>아이템 2</li>
        </TodoList.List>,
      );
      expect(screen.getByText("아이템 1")).toBeInTheDocument();
      expect(screen.getByText("아이템 2")).toBeInTheDocument();
    });
  });

  describe("footer 조건부 렌더링", () => {
    test("footer가 전달되면 렌더링된다", () => {
      render(
        <TodoList.List
          {...defaultProps}
          footer={<button>할 일 추가</button>}
        >
          <li>아이템</li>
        </TodoList.List>,
      );
      expect(
        screen.getByRole("button", { name: "할 일 추가" }),
      ).toBeInTheDocument();
    });

    test("footer가 없으면 footer 영역이 렌더링되지 않는다", () => {
      render(
        <TodoList.List {...defaultProps}>
          <li>아이템</li>
        </TodoList.List>,
      );
      expect(
        screen.queryByRole("button", { name: "할 일 추가" }),
      ).not.toBeInTheDocument();
    });
  });

  describe("정렬 변경", () => {
    test("정렬 옵션 선택 시 onSortChange가 선택된 값으로 호출된다", async () => {
      render(
        <TodoList.List {...defaultProps}>
          <li>아이템</li>
        </TodoList.List>,
      );
      await userEvent.click(screen.getByRole("button", { name: "최신순" }));
      expect(onSortChange).toHaveBeenCalledWith("최신순");
      expect(onSortChange).toHaveBeenCalledTimes(1);
    });
  });
});
