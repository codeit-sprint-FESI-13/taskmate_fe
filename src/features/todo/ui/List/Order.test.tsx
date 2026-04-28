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
});
