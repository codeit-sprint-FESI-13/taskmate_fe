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
  // @TODO: useOverlay 또는 Modal.BackDrop 처리
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  // @TODO: useOverlay 통해서 처리하고 UI return 이 조건에 따라 달라지게 하는 코드 제거
  if (!isOpen) return null;

  return (
    // @TODO: Modal로 처리하는데 감싸는 div가 필요한지 판단
    // @TODO: z index 9999 제거, OVERLAY_ZINDEX_BASE 사용
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
