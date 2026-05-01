"use client";

import Button from "@/shared/ui/Button/Button/Button";
import { Modal } from "@/shared/ui/Modal";

interface TodoDeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export const TodoDeleteModal = ({
  onClose,
  onConfirm,
}: TodoDeleteModalProps) => {
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
