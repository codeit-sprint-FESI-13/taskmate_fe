"use client";

import { useGoalId } from "@/features/goal/hooks/useGoalId";
import { useOverlay } from "@/hooks/useOverlay";
import Button from "@/shared/ui/Button/Button/Button";
import { Modal } from "@/shared/ui/Modal";

import { todoApi } from "../api";

const TODO_DELETE_MODAL_ID = "todo-delete-confirm-modal";

const TodoDeleteModal = ({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) => {
  return (
    <Modal.Root onClose={onClose}>
      <Modal.Backdrop />
      <Modal.Content>
        <Modal.Title>할 일을 삭제하시겠습니까?</Modal.Title>
        <Modal.Actions>
          <Button
            variant="secondary"
            size="md"
            className="flex-1"
            onClick={onClose}
          >
            취소
          </Button>
          <Button
            variant="primary"
            size="md"
            className="flex-1"
            onClick={onConfirm}
          >
            삭제
          </Button>
        </Modal.Actions>
      </Modal.Content>
    </Modal.Root>
  );
};

export const useTodoDeleteModal = ({ todoId }: { todoId: string }) => {
  const overlay = useOverlay();
  const goalId = useGoalId();

  const closeTodoDeleteModal = () => {
    overlay.close();
  };

  const openTodoDeleteModal = () => {
    const handleConfirm = async () => {
      await todoApi.delete(goalId, todoId);
      closeTodoDeleteModal();
    };

    overlay.open(
      TODO_DELETE_MODAL_ID,
      <TodoDeleteModal
        onClose={closeTodoDeleteModal}
        onConfirm={handleConfirm}
      />,
    );
  };

  return {
    openTodoDeleteModal,
    closeTodoDeleteModal,
  };
};
