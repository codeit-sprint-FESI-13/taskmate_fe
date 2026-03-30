"use client";

import Button from "@/components/common/Button/Button";
import { Modal } from "@/components/common/Modal";
import { useOverlay } from "@/hooks/useOverlay";

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

export const useTodoDeleteModal = () => {
  const overlay = useOverlay();

  const closeTodoDeleteModal = () => {
    overlay.close();
  };

  const openTodoDeleteModal = () => {
    const handleConfirm = () => {
      // @TODO: DELETE todo API 연동
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
