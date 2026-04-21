"use client";

import { useEffect } from "react";

import Button from "@/shared/ui/Button/Button/Button";
import { Modal } from "@/shared/ui/Modal";

interface ErrorModalProps {
  message?: string;
  isOpen: boolean;
  onClose: () => void;
}

const ErrorModal = ({ message, isOpen, onClose }: ErrorModalProps) => {
  // @TODO: useOverlay 또는 Modal.BackDrop 처리
  // @TODO: 중복코드
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
          <Modal.Title className="p-2 py-7 font-normal">{message}</Modal.Title>
          <Modal.Actions>
            <Button
              type="button"
              onClick={onClose}
              className="my-2 flex-1"
            >
              확인
            </Button>
          </Modal.Actions>
        </Modal.Content>
      </Modal.Root>
    </div>
  );
};

export default ErrorModal;
