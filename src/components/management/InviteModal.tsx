"use client";

import { useEffect, useState } from "react";

import Input from "@/components/common/Input/Input";
import { teamDetailApi } from "@/features/management/api";
import { validateEmail } from "@/features/management/utils";
import { useTeamId } from "@/features/team/hooks/useTeamId";
import Button from "@/shared/ui/Button/Button/Button";

interface InviteModalProps {
  onClose: () => void;
  onSubmitInvite: (email: string) => Promise<void>;
}

const InviteModal = ({ onClose, onSubmitInvite }: InviteModalProps) => {
  const [email, setEmail] = useState("");
  const emailError = validateEmail(email);
  const isDisabled = Boolean(emailError);
  const teamId = Number(useTeamId());
  const [value, setValue] = useState("");
  const [initialName, setInitialName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = validateEmail(email);
    if (error) return;

    // @TODO: useMutation 으로 리팩토링
    try {
      await onSubmitInvite(email);
      onClose();
    } catch (err) {
      setErrorMessage(
        (err as { message?: string }).message ??
          "알 수 없는 오류가 발생했습니다.",
      );
    }
  };

  // @TODO: useOverlay 또는 Modal.BackDrop 처리
  // @TODO: 중복코드
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    // @TODO: useTeamId 에서 처리
    if (Number.isNaN(teamId)) return;

    // @TODO: useSuspenseQuery 및 AsyncBoundary 사용
    teamDetailApi
      .read(teamId)
      .then((res) => {
        if (res?.data?.name) setValue(res.data.name);
        setInitialName(res.data.name);
      })
      .catch(() => {
        setValue("팀명");
      });
  }, [teamId]);

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
            value={value}
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
          {/* @TODO: "errorMessage && 로 처리하기" 랑 지금 코드랑 비교후 적용 */}
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
