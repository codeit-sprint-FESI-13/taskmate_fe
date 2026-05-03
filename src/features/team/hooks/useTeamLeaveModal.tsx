"use client";

import { useLeaveTeamMutation } from "@/features/team/mutation/useLeaveTeamMutation";
import { useOverlay } from "@/shared/hooks/useOverlay";
import { useToast } from "@/shared/hooks/useToast";
import type { ApiError } from "@/shared/lib/api/types";
import Button from "@/shared/ui/Button/Button/Button";
import { Modal } from "@/shared/ui/Modal";

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

  const leaveMutation = useLeaveTeamMutation({
    onSuccess: () => {
      toast({
        title: "팀 나가기 성공",
        description: "팀 나가기에 성공했습니다.",
        variant: "success",
      });
      overlay.close();
    },
    onError: (error: ApiError) => {
      toast({
        title: "팀 나가기 실패",
        description: error.message ?? "팀 나가기에 실패했습니다.",
        variant: "error",
      });
    },
  });

  const openLeaveTeamModal = () => {
    overlay.open(
      LEAVE_TEAM_MODAL_ID,
      <TeamLeaveModal
        onClose={() => overlay.close()}
        onConfirm={() => leaveMutation.mutate(teamId)}
      />,
    );
  };

  return {
    openLeaveTeamModal,
  };
};
