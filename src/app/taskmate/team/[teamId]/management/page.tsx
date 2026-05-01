"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { inviteApi, teamDetailApi } from "@/entities/team";
import { useOverlay } from "@/shared/hooks/useOverlay";
import TextButton from "@/shared/ui/Button/TextButton/TextButton";
import DeleteModal from "@/widgets/management/DeleteModal";
import ErrorModal from "@/widgets/management/ErrorModal";
import InviteModal from "@/widgets/management/InviteModal";
import MemberList from "@/widgets/management/MemberList";
import TeamNameEditor from "@/widgets/management/TeamNameEditor";

// @TODO: Page가 갖는 책임에서 벗어나는 코드 제거 및 분리
const TeamManagement = () => {
  const { open, close } = useOverlay();
  const router = useRouter();
  const params = useParams<{ teamId: string }>();
  const teamId = params.teamId;
  const [errorMessage, setErrorMessage] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);

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
        onError={(message) => {
          setErrorMessage(message);
          setErrorModalOpen(true);
        }}
      />,
    );
  };

  useEffect(() => {
    // @TODO: useSuspenseQuery 및 AsyncBoundary 사용
    // @TODO: page 컴포넌트에서 해당 코드 분리
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
    <section>
      <main className="tablet:px-6 tablet:py-16 desktop:px-22 desktop:py-20 relative mx-auto flex w-full min-w-0 flex-col items-center justify-center px-5 py-8">
        <div className="tablet:gap-6 relative mx-auto flex w-full max-w-140 flex-col gap-4">
          <h1 className="tablet:block typography-title-3 hidden">
            팀 정보 수정
          </h1>
          <div className="flex w-full flex-col gap-4">
            <TeamNameEditor />
            <MemberList onInviteClick={handleOpenInvite} />
            <TextButton
              onClick={handleOpenDelete}
              className="tablet:w-fit ml-auto w-full"
            >
              팀 삭제하기
            </TextButton>
          </div>
        </div>
      </main>

      <ErrorModal
        message={errorMessage}
        isOpen={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
      />
    </section>
  );
};

export default TeamManagement;
