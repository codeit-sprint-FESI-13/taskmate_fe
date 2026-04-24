import { act, renderHook } from "@testing-library/react";

import { useDeleteGoalMutation } from "@/features/goal/mutation/useDeleteGoalMutation";
import { useUpdateGoalMutation } from "@/features/goal/mutation/useUpdateGoalMutation";
import type { GoalEditModalProps } from "@/features/goal/ui/GoalEditModal";
import { useOverlay } from "@/shared/hooks/useOverlay";

import { useGoalActions } from "./useGoalActions";

jest.mock("@/shared/hooks/useOverlay");
jest.mock("@/features/goal/mutation/useDeleteGoalMutation");
jest.mock("@/features/goal/mutation/useUpdateGoalMutation");
jest.mock("@/features/goal/ui/GoalEditModal", () => ({
  GoalEditModal: () => null,
}));
jest.mock("@/shared/ui/ConfirmModal", () => ({
  default: () => null,
}));

const mockUseOverlay = useOverlay as jest.MockedFunction<typeof useOverlay>;
const mockUseDeleteGoalMutation = useDeleteGoalMutation as jest.MockedFunction<
  typeof useDeleteGoalMutation
>;
const mockUseUpdateGoalMutation = useUpdateGoalMutation as jest.MockedFunction<
  typeof useUpdateGoalMutation
>;

const defaultSummary = {
  goalName: "디자인 시스템 완성",
  dueDate: "2026-12-31",
};

const defaultParams = {
  goalId: "1",
  teamId: null,
  summary: defaultSummary,
  onMenuClose: jest.fn(),
};

describe("useGoalActions", () => {
  let mockOpen: jest.Mock;
  let mockClose: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockOpen = jest.fn();
    mockClose = jest.fn();

    mockUseOverlay.mockReturnValue({ open: mockOpen, close: mockClose });

    mockUseDeleteGoalMutation.mockReturnValue({
      isPending: false,
      mutate: jest.fn(),
    } as unknown as ReturnType<typeof useDeleteGoalMutation>);

    mockUseUpdateGoalMutation.mockReturnValue({
      isPending: false,
      mutate: jest.fn(),
    } as unknown as ReturnType<typeof useUpdateGoalMutation>);
  });

  describe("openEditModal", () => {
    test("onMenuClose를 먼저 호출한다", () => {
      const onMenuClose = jest.fn();
      const { result } = renderHook(() =>
        useGoalActions({ ...defaultParams, onMenuClose }),
      );

      act(() => {
        result.current.openEditModal();
      });

      expect(onMenuClose).toHaveBeenCalledTimes(1);
    });

    test("goal-edit-modal ID로 overlay를 연다", () => {
      const { result } = renderHook(() => useGoalActions(defaultParams));

      act(() => {
        result.current.openEditModal();
      });

      expect(mockOpen).toHaveBeenCalledWith(
        "goal-edit-modal",
        expect.anything(),
      );
    });

    test("GoalEditModal에 summary의 초기값을 전달한다", () => {
      const { result } = renderHook(() => useGoalActions(defaultParams));

      act(() => {
        result.current.openEditModal();
      });

      const [, element] = mockOpen.mock.calls[0] as [
        string,
        React.ReactElement<GoalEditModalProps>,
      ];
      expect(element.props.initialName).toBe("디자인 시스템 완성");
      expect(element.props.initialDueDate).toBe("2026-12-31");
    });
  });

  describe("openDeleteConfirm", () => {
    test("onMenuClose를 먼저 호출한다", () => {
      const onMenuClose = jest.fn();
      const { result } = renderHook(() =>
        useGoalActions({ ...defaultParams, onMenuClose }),
      );

      act(() => {
        result.current.openDeleteConfirm();
      });

      expect(onMenuClose).toHaveBeenCalledTimes(1);
    });

    test("goal-delete-confirm-modal ID로 overlay를 연다", () => {
      const { result } = renderHook(() => useGoalActions(defaultParams));

      act(() => {
        result.current.openDeleteConfirm();
      });

      expect(mockOpen).toHaveBeenCalledWith(
        "goal-delete-confirm-modal",
        expect.anything(),
      );
    });
  });

  describe("isMutationPending", () => {
    test("두 mutation이 모두 pending이 아니면 false를 반환한다", () => {
      const { result } = renderHook(() => useGoalActions(defaultParams));

      expect(result.current.isMutationPending).toBe(false);
    });

    test("deleteMutation이 pending이면 true를 반환한다", () => {
      mockUseDeleteGoalMutation.mockReturnValue({
        isPending: true,
        mutate: jest.fn(),
      } as unknown as ReturnType<typeof useDeleteGoalMutation>);

      const { result } = renderHook(() => useGoalActions(defaultParams));

      expect(result.current.isMutationPending).toBe(true);
    });

    test("updateMutation이 pending이면 true를 반환한다", () => {
      mockUseUpdateGoalMutation.mockReturnValue({
        isPending: true,
        mutate: jest.fn(),
      } as unknown as ReturnType<typeof useUpdateGoalMutation>);

      const { result } = renderHook(() => useGoalActions(defaultParams));

      expect(result.current.isMutationPending).toBe(true);
    });
  });
});
