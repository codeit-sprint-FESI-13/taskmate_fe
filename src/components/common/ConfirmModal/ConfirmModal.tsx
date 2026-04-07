import React from "react";

import Button from "@/components/common/Button/Button";
import { Icon } from "@/components/common/Icon";
import { Modal } from "@/components/common/Modal";
import TextButton from "@/components/common/TextButton/TextButton";

interface ConfirmModalProps {
  title: string;
  description?: string;
  info?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmModal = ({
  title,
  description,
  info,
  confirmLabel = "확인",
  cancelLabel = "취소",
  onConfirm,
  onClose,
}: ConfirmModalProps) => {
  return (
    <Modal.Root onClose={onClose}>
      <Modal.Backdrop />
      <Modal.Content>
        <Modal.Title>{title}</Modal.Title>
        {(description || info) && (
          <div className="mt-1.5 flex flex-col gap-3">
            {description && (
              <p className="text-label-1 tablet:text-body-1 text-center font-medium text-gray-400">
                {description}
              </p>
            )}
            {info && (
              <p className="text-label-2 tablet:gap-2.5 tablet:text-body-2 flex items-center justify-center gap-1.5 font-medium text-blue-700">
                <Icon
                  name="Info"
                  className="tablet:w-6 tablet:h-6 h-5 w-5"
                />
                {info}
              </p>
            )}
          </div>
        )}
        <Modal.Actions className="tablet:mt-10 mt-4 flex flex-col">
          <Button
            variant="primary"
            onClick={onConfirm}
            className="w-full"
          >
            {confirmLabel}
          </Button>
          <TextButton
            variant="primary"
            onClick={onClose}
            className="w-full"
          >
            {cancelLabel}
          </TextButton>
        </Modal.Actions>
      </Modal.Content>
    </Modal.Root>
  );
};

export default ConfirmModal;
