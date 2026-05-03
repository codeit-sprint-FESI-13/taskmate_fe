import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Order } from "./Order";

jest.mock("@/shared/ui/Icon", () => ({
  Icon: ({ name }: { name: string }) => <span data-testid={`icon-${name}`} />,
}));

describe("Order", () => {
  const options = ["마감일 순", "최신순", "오래된순"];
  const onSelect = jest.fn();

  beforeEach(() => {
    onSelect.mockClear();
  });

  describe("초기 렌더링", () => {
    test("선택된 정렬 옵션이 표시된다", () => {
      render(
        <Order
          options={options}
          selected="마감일 순"
          onSelect={onSelect}
        />,
      );
      expect(screen.getByText("마감일 순")).toBeInTheDocument();
    });

    test("초기에 드롭다운이 닫혀 있다", () => {
      render(
        <Order
          options={options}
          selected="마감일 순"
          onSelect={onSelect}
        />,
      );
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  describe("드롭다운 열기/닫기", () => {
    test("버튼 클릭 시 드롭다운이 열린다", async () => {
      render(
        <Order
          options={options}
          selected="마감일 순"
          onSelect={onSelect}
        />,
      );
      await userEvent.click(screen.getByRole("button"));
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    test("드롭다운이 열리면 전달된 모든 옵션이 표시된다", async () => {
      render(
        <Order
          options={options}
          selected="마감일 순"
          onSelect={onSelect}
        />,
      );
      await userEvent.click(screen.getByRole("button"));
      const listbox = screen.getByRole("listbox");
      options.forEach((option) => {
        expect(within(listbox).getByText(option)).toBeInTheDocument();
      });
    });

    test("버튼을 두 번 클릭하면 드롭다운이 닫힌다", async () => {
      render(
        <Order
          options={options}
          selected="마감일 순"
          onSelect={onSelect}
        />,
      );
      const button = screen.getByRole("button");
      await userEvent.click(button);
      await userEvent.click(button);
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  describe("옵션 선택", () => {
    test("옵션 클릭 시 onSelect가 해당 값으로 호출된다", async () => {
      render(
        <Order
          options={options}
          selected="마감일 순"
          onSelect={onSelect}
        />,
      );
      await userEvent.click(screen.getByRole("button"));
      await userEvent.click(screen.getByText("최신순"));
      expect(onSelect).toHaveBeenCalledWith("최신순");
      expect(onSelect).toHaveBeenCalledTimes(1);
    });

    test("옵션 선택 후 드롭다운이 닫힌다", async () => {
      render(
        <Order
          options={options}
          selected="마감일 순"
          onSelect={onSelect}
        />,
      );
      await userEvent.click(screen.getByRole("button"));
      await userEvent.click(screen.getByText("최신순"));
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  describe("ARIA 속성", () => {
    test("초기에 버튼의 aria-expanded가 false다", () => {
      render(
        <Order
          options={options}
          selected="마감일 순"
          onSelect={onSelect}
        />,
      );
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    });

    test("드롭다운이 열리면 버튼의 aria-expanded가 true가 된다", async () => {
      render(
        <Order
          options={options}
          selected="마감일 순"
          onSelect={onSelect}
        />,
      );
      await userEvent.click(screen.getByRole("button"));
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-expanded",
        "true",
      );
    });

    test("선택된 옵션의 aria-selected가 true이고 나머지는 false다", async () => {
      render(
        <Order
          options={options}
          selected="마감일 순"
          onSelect={onSelect}
        />,
      );
      await userEvent.click(screen.getByRole("button"));
      expect(screen.getByRole("option", { name: "마감일 순" })).toHaveAttribute(
        "aria-selected",
        "true",
      );
      expect(screen.getByRole("option", { name: "최신순" })).toHaveAttribute(
        "aria-selected",
        "false",
      );
    });
  });

  describe("외부 클릭", () => {
    test("드롭다운 외부 클릭 시 닫힌다", async () => {
      render(
        <Order
          options={options}
          selected="마감일 순"
          onSelect={onSelect}
        />,
      );
      await userEvent.click(screen.getByRole("button"));
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      await userEvent.click(document.body);
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  describe("selected prop 변경", () => {
    test("selected prop이 변경되면 표시값이 업데이트된다", () => {
      const { rerender } = render(
        <Order
          options={options}
          selected="마감일 순"
          onSelect={onSelect}
        />,
      );
      expect(screen.getByText("마감일 순")).toBeInTheDocument();

      rerender(
        <Order
          options={options}
          selected="최신순"
          onSelect={onSelect}
        />,
      );
      expect(screen.getByText("최신순")).toBeInTheDocument();
    });
  });
});
