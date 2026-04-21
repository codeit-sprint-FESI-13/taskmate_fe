"use client";
import { useLogout } from "@/hooks/useLogout";
import Button from "@/shared/ui/Button/Button/Button";
import { Modal } from "@/shared/ui/Modal";

export const LogoutModal = ({ onClose }: { onClose: () => void }) => {
  const { logout } = useLogout();
  return (
    <Modal.Root onClose={onClose}>
      <Modal.Backdrop />
      <Modal.Content>
        <Modal.Title>로그아웃 하시겠어요?</Modal.Title>
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
            onClick={logout}
          >
            로그아웃
          </Button>
        </Modal.Actions>
      </Modal.Content>
    </Modal.Root>
  );
};
