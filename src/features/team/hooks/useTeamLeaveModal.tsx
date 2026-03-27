"use client";

import Button from "@/components/common/Button/Button";
import { Modal } from "@/components/common/Modal";
import { useOverlay } from "@/hooks/useOverlay";
import { useToast } from "@/hooks/useToast";
import { ApiError } from "@/lib/api/types";

import { teamApi } from "../api";

const LEAVE_TEAM_MODAL_ID = "leave-team-confirm-modal";

const TeamLeaveModal = ({
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
        <Modal.Title>팀을 나가시겠습니까?</Modal.Title>
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
            나가기
          </Button>
        </Modal.Actions>
      </Modal.Content>
    </Modal.Root>
  );
};

export const useTeamLeaveModal = (teamId: string) => {
  const overlay = useOverlay();
  const { toast } = useToast();

  const closeLeaveTeamModal = () => {
    overlay.close();
  };

  const openLeaveTeamModal = () => {
    const handleConfirm = async () => {
      try {
        await teamApi.quitTeam(teamId);
        toast({
          title: "팀 나가기 성공",
          description: "팀 나가기에 성공했습니다.",
          variant: "success",
        });
        closeLeaveTeamModal();
      } catch (error) {
        const apiError = error as ApiError;

        toast({
          title: "팀 나가기 실패",
          description: apiError.message ?? "팀 나가기에 실패했습니다.",
          variant: "error",
        });
      }
    };

    overlay.open(
      LEAVE_TEAM_MODAL_ID,
      <TeamLeaveModal
        onClose={closeLeaveTeamModal}
        onConfirm={handleConfirm}
      />,
    );
  };

  return {
    openLeaveTeamModal,
    closeLeaveTeamModal,
  };
};
