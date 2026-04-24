"use client";

import { useDeleteGoalMutation } from "@/features/goal/mutation/useDeleteGoalMutation";
import { useUpdateGoalMutation } from "@/features/goal/mutation/useUpdateGoalMutation";
import { GoalEditModal } from "@/features/goal/ui/GoalEditModal";
import { useOverlay } from "@/shared/hooks/useOverlay";
import ConfirmModal from "@/shared/ui/ConfirmModal";

const GOAL_EDIT_MODAL_ID = "goal-edit-modal";
const GOAL_DELETE_MODAL_ID = "goal-delete-confirm-modal";

type UseGoalActionsParams = {
  goalId: string;
  teamId: string | null;
  summary: { goalName: string; dueDate: string };
  onMenuClose: () => void;
};

export function useGoalActions({
  goalId,
  teamId,
  summary,
  onMenuClose,
}: UseGoalActionsParams) {
  const overlay = useOverlay();

  const deleteMutation = useDeleteGoalMutation({
    goalId,
    teamId,
    onDeleted: () => overlay.close(),
  });

  const updateMutation = useUpdateGoalMutation({
    goalId,
    teamId,
    onUpdated: () => overlay.close(),
  });

  const openEditModal = () => {
    onMenuClose();
    overlay.open(
      GOAL_EDIT_MODAL_ID,
      <GoalEditModal
        initialName={summary.goalName}
        initialDueDate={summary.dueDate}
        onClose={() => overlay.close()}
        isPending={updateMutation.isPending}
        onSave={(input) => updateMutation.mutate(input)}
      />,
    );
  };

  const openDeleteConfirm = () => {
    onMenuClose();
    overlay.open(
      GOAL_DELETE_MODAL_ID,
      <ConfirmModal
        title="목표를 휴지통으로 이동할까요?"
        description="이동한 목표는 휴지통에서 복구하거나 완전히 삭제할 수 있어요."
        confirmLabel="휴지통으로 이동"
        cancelLabel="취소"
        onClose={() => overlay.close()}
        onConfirm={() => deleteMutation.mutate()}
      />,
    );
  };

  return {
    openEditModal,
    openDeleteConfirm,
    isMutationPending: deleteMutation.isPending || updateMutation.isPending,
  };
}
