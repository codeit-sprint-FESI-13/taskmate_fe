import { act, renderHook } from "@testing-library/react";

import { useDeleteTodoMutation } from "@/features/todo/mutation/useDeleteTodoMutation";
import { useGoalId } from "@/shared/hooks/useGoalId";
import { useOverlay } from "@/shared/hooks/useOverlay";

import { useTodoDeleteModal } from "./useTodoDeleteModal";

jest.mock("@/shared/hooks/useGoalId");
jest.mock("@/shared/hooks/useOverlay");
jest.mock("@/features/todo/mutation/useDeleteTodoMutation");
jest.mock("@/features/todo/ui/TodoDeleteModal/TodoDeleteModal", () => ({
  TodoDeleteModal: () => null,
}));

const mockUseGoalId = useGoalId as jest.MockedFunction<typeof useGoalId>;
const mockUseOverlay = useOverlay as jest.MockedFunction<typeof useOverlay>;
const mockUseDeleteTodoMutation = useDeleteTodoMutation as jest.MockedFunction<
  typeof useDeleteTodoMutation
>;

describe("useTodoDeleteModal", () => {
  let mockOpen: jest.Mock;
  let mockClose: jest.Mock;
  let mockDeleteTodo: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockOpen = jest.fn();
    mockClose = jest.fn();
    mockDeleteTodo = jest.fn();

    mockUseGoalId.mockReturnValue("10");
    mockUseOverlay.mockReturnValue({ open: mockOpen, close: mockClose });
    mockUseDeleteTodoMutation.mockReturnValue({
      mutate: mockDeleteTodo,
      isPending: false,
    } as unknown as ReturnType<typeof useDeleteTodoMutation>);
  });

  describe("openTodoDeleteModal", () => {
    test("todo-delete-confirm-modal ID로 overlay를 연다", () => {
      const { result } = renderHook(() => useTodoDeleteModal({ todoId: "5" }));

      act(() => {
        result.current.openTodoDeleteModal();
      });

      expect(mockOpen).toHaveBeenCalledWith(
        "todo-delete-confirm-modal",
        expect.anything(),
      );
    });

    test("TodoDeleteModal에 onClose와 onConfirm props를 전달한다", () => {
      const { result } = renderHook(() => useTodoDeleteModal({ todoId: "5" }));

      act(() => {
        result.current.openTodoDeleteModal();
      });

      const [, element] = mockOpen.mock.calls[0] as [
        string,
        React.ReactElement<{ onClose: () => void; onConfirm: () => void }>,
      ];

      expect(typeof element.props.onClose).toBe("function");
      expect(typeof element.props.onConfirm).toBe("function");
    });

    test("onConfirm 호출 시 goalId와 todoId로 deleteTodo를 실행한다", () => {
      const { result } = renderHook(() => useTodoDeleteModal({ todoId: "5" }));

      act(() => {
        result.current.openTodoDeleteModal();
      });

      const [, element] = mockOpen.mock.calls[0] as [
        string,
        React.ReactElement<{ onConfirm: () => void }>,
      ];

      act(() => {
        element.props.onConfirm();
      });

      expect(mockDeleteTodo).toHaveBeenCalledWith({
        goalId: "10",
        todoId: "5",
      });
    });

    test("onClose 호출 시 overlay.close를 실행한다", () => {
      const { result } = renderHook(() => useTodoDeleteModal({ todoId: "5" }));

      act(() => {
        result.current.openTodoDeleteModal();
      });

      const [, element] = mockOpen.mock.calls[0] as [
        string,
        React.ReactElement<{ onClose: () => void }>,
      ];

      act(() => {
        element.props.onClose();
      });

      expect(mockClose).toHaveBeenCalled();
    });
  });

  describe("closeTodoDeleteModal", () => {
    test("overlay.close를 호출한다", () => {
      const { result } = renderHook(() => useTodoDeleteModal({ todoId: "5" }));

      act(() => {
        result.current.closeTodoDeleteModal();
      });

      expect(mockClose).toHaveBeenCalled();
    });
  });

  describe("useDeleteTodoMutation에 전달되는 onSuccess", () => {
    test("mutation 성공 시 overlay.close가 호출된다", () => {
      let capturedOnSuccess: (() => void) | undefined;

      mockUseDeleteTodoMutation.mockImplementation(({ onSuccess } = {}) => {
        capturedOnSuccess = onSuccess;
        return {
          mutate: mockDeleteTodo,
          isPending: false,
        } as unknown as ReturnType<typeof useDeleteTodoMutation>;
      });

      renderHook(() => useTodoDeleteModal({ todoId: "5" }));

      act(() => {
        capturedOnSuccess?.();
      });

      expect(mockClose).toHaveBeenCalled();
    });
  });
});
