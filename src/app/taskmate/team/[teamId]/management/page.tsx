"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import TextButton from "@/components/common/TextButton/TextButton";
import DeleteModal from "@/components/management/DeleteModal";
import InviteModal from "@/components/management/InviteModal";
import MemberList from "@/components/management/MemberList";
import TeamNameEditor from "@/components/management/TeamNameEditor";
import { inviteApi, teamDetailApi } from "@/features/management/api";
import { useOverlay } from "@/hooks/useOverlay";

const TeamManagement = () => {
  const { open, close } = useOverlay();
  const router = useRouter();
  const params = useParams<{ teamId: string }>();
  const teamId = params.teamId;

  const handleOpenInvite = () => {
    open(
      "invite-modal",
      <InviteModal
        onClose={() => close()}
        onSubmitInvite={async (email: string) => {
          await inviteApi.create(teamId, email); // string 전달
        }}
      />,
    );
  };

  const handleOpenDelete = () => {
    open(
      "delete-modal",
      <DeleteModal
        onClose={() => close()}
        onSubmitDelete={async () => {
          await teamDetailApi.delete(Number(teamId));
          close();
          router.replace("/taskmate");
        }}
      />,
    );
  };

  useEffect(() => {
    const guardTeamAccess = async () => {
      try {
        await teamDetailApi.read(Number(teamId));
      } catch (error: unknown) {
        const status =
          typeof error === "object" && error !== null && "status" in error
            ? (error as { status?: number }).status
            : undefined;

        if (status === 401) return router.replace("/login");
        return router.replace("/taskmate");
      }
    };

    if (!teamId) return;
    guardTeamAccess();
  }, [teamId, router]);

  return (
    <main className="relative my-20 flex w-full flex-col items-center gap-6">
      <div className="relative flex flex-col gap-6">
        <h1 className="typography-title-3">팀 정보 수정</h1>
        <div className="flex w-140 flex-col gap-6">
          <TeamNameEditor />
          <MemberList onInviteClick={handleOpenInvite} />
          <TextButton
            onClick={handleOpenDelete}
            className="ml-auto w-fit"
          >
            팀 삭제하기
          </TextButton>
        </div>
      </div>
    </main>
  );
};

export default TeamManagement;
