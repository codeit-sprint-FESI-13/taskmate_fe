"use client";

import { useEffect } from "react";

import Button from "@/components/common/Button/Button";
import { Modal } from "@/components/common/Modal";

interface ConfirmModalProps {
  message?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmModal = ({
  message,
  isOpen,
  onClose,
  onConfirm,
}: ConfirmModalProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 p-10">
      <Modal.Root onClose={onClose}>
        <Modal.Backdrop />
        <Modal.Content>
          <Modal.Title className="p-2 py-10 font-normal">{message}</Modal.Title>
          <Modal.Actions>
            <Button
              type="button"
              onClick={onClose}
              className="flex-1"
              variant="secondary"
            >
              취소
            </Button>
            <Button
              type="button"
              onClick={onConfirm}
              className="flex-1"
            >
              확인
            </Button>
          </Modal.Actions>
        </Modal.Content>
      </Modal.Root>
    </div>
  );
};

export default ConfirmModal;
