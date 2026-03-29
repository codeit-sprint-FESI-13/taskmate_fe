"use client";

import TextButton from "@/components/common/TextButton/TextButton";
import InviteModal from "@/components/management/InviteModal";
import MemberList from "@/components/management/MemberList";
import TeamNameEditor from "@/components/management/TeamNameEditor";
import { useOverlay } from "@/hooks/useOverlay";

const TeamManagement = () => {
  const { open, close } = useOverlay();

  const handleOpenInvite = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    open(
      "invite-modal",
      <InviteModal
        onClose={() => {
          close();
        }}
      />,
    );
  };

  return (
    <main className="relative my-20 flex w-full flex-col items-center gap-6">
      <div className="relative flex flex-col gap-6">
        <h1 className="typography-title-3">팀 정보 수정</h1>
        <div className="flex w-140 flex-col gap-6">
          <TeamNameEditor />
          <MemberList onInviteClick={handleOpenInvite} />

          <TextButton className="ml-auto w-fit">팀 삭제하기</TextButton>
        </div>
      </div>
    </main>
  );
};

export default TeamManagement;
