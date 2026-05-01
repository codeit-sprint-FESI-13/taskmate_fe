import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TodoDeleteModal } from "./TodoDeleteModal";

describe("TodoDeleteModal", () => {
  const defaultProps = {
    onClose: jest.fn(),
    onConfirm: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("초기 렌더링", () => {
    test("삭제 확인 문구를 표시한다", () => {
      render(<TodoDeleteModal {...defaultProps} />);
      expect(screen.getByText("할 일을 삭제하시겠습니까?")).toBeInTheDocument();
    });

    test("취소 버튼을 표시한다", () => {
      render(<TodoDeleteModal {...defaultProps} />);
      expect(screen.getByRole("button", { name: "취소" })).toBeInTheDocument();
    });

    test("삭제 버튼을 표시한다", () => {
      render(<TodoDeleteModal {...defaultProps} />);
      expect(screen.getByRole("button", { name: "삭제" })).toBeInTheDocument();
    });
  });

  describe("취소 버튼", () => {
    test("클릭 시 onClose를 호출한다", async () => {
      render(<TodoDeleteModal {...defaultProps} />);
      await userEvent.click(screen.getByRole("button", { name: "취소" }));
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    test("클릭 시 onConfirm은 호출하지 않는다", async () => {
      render(<TodoDeleteModal {...defaultProps} />);
      await userEvent.click(screen.getByRole("button", { name: "취소" }));
      expect(defaultProps.onConfirm).not.toHaveBeenCalled();
    });
  });

  describe("삭제 버튼", () => {
    test("클릭 시 onConfirm을 호출한다", async () => {
      render(<TodoDeleteModal {...defaultProps} />);
      await userEvent.click(screen.getByRole("button", { name: "삭제" }));
      expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
    });

    test("클릭 시 onClose는 호출하지 않는다", async () => {
      render(<TodoDeleteModal {...defaultProps} />);
      await userEvent.click(screen.getByRole("button", { name: "삭제" }));
      expect(defaultProps.onClose).not.toHaveBeenCalled();
    });
  });
});
