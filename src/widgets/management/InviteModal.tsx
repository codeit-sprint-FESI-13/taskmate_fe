"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { managementQueryOptions } from "@/entities/team";
import {
  inviteEmailSchema,
  useInviteMemberMutation,
} from "@/features/management";
import { useTeamId } from "@/features/team";
import Button from "@/shared/ui/Button/Button/Button";
import Input from "@/shared/ui/Input/Input";

interface InviteModalProps {
  onClose: () => void;
}

const InviteModal = ({ onClose }: InviteModalProps) => {
  const teamId = useTeamId();
  const { data: teamDetail } = useQuery(
    managementQueryOptions.teamDetail(Number(teamId)),
  );

  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const isDisabled = !inviteEmailSchema.safeParse({ email }).success;

  const { mutate: inviteMember } = useInviteMemberMutation({
    onSuccess: onClose,
  });

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = inviteEmailSchema.safeParse({ email });
    if (!result.success) return;

    inviteMember(
      { teamId: String(teamId), email: result.data.email },
      {
        onError: (err) => {
          setErrorMessage(
            (err as { message?: string }).message ??
              "알 수 없는 오류가 발생했습니다.",
          );
        },
      },
    );
  };

  // @TODO: useOverlay 또는 Modal.BackDrop 처리
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // @TODO: Modal 공통 컴포넌트로 리팩토링
  return (
    <section className="fixed inset-0 z-9999 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative flex w-112.5 flex-col gap-4 rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="typography-heading-2">팀원 초대하기</h2>
        <span></span>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          {/* @TODO: label 태그 사용 */}
          <p>소속 팀</p>
          <Input
            value={teamDetail?.name ?? ""}
            className="rounded-4 bg-background-normal-alternative border border-gray-200 p-4 text-gray-400 hover:border-gray-200"
            disabled
          />
          {/* @TODO: label 태그 사용 */}
          <p>
            이메일 <span className="text-red-normal">*</span>
          </p>
          <Input
            placeholder="초대 메일 발송을 위한 메일을 입력해주세요."
            className="rounded-4 border border-gray-200 p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className={errorMessage ? "text-red-normal visible" : "invisible"}>
            {errorMessage || " "}
          </p>
          <div className="flex w-full gap-2">
            <Button
              type="button"
              onClick={onClose}
              className="flex-1"
              variant="secondary"
            >
              취소하기
            </Button>
            <Button
              type="submit"
              className="flex-1"
              isDisabled={isDisabled}
            >
              초대하기
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default InviteModal;
