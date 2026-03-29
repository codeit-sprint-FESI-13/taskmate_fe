"use client";

import { useEffect, useState } from "react";

import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import { inviteApi } from "@/features/management/api";
import { validateEmail } from "@/features/management/utils";

interface InviteModalProps {
  onClose: () => void;
}

const InviteModal = ({ onClose }: InviteModalProps) => {
  const [email, setEmail] = useState("");
  const emailError = validateEmail(email);
  const isDisabled = Boolean(emailError);
  const teamId = "1";

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const error = validateEmail(email);

    console.log("[invite] input:", email);
    console.log("[invite] trimmed:", email.trim());
    console.log("[invite] validation error:", error); // null이면 통과

    if (error) return;

    console.log("[invite] validation passed, submit API");
    // await inviteMember(...)

    try {
      await inviteApi.create(teamId, email);
      onClose();
    } catch {
      console.log("api 연결 실패");
    }
  };

  // 모달 스크롤
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <section className="fixed inset-0 z-9999 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative flex w-112.5 flex-col gap-4 rounded-2xl bg-white p-8 shadow-lg">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 w-fit cursor-pointer self-end text-2xl"
        >
          x
        </button>
        <h2>팀원 초대</h2>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <Input
            placeholder="초대하실 분의 이메일을 입력해주세요."
            className="rounded-4 border border-gray-200 p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            type="submit"
            className="ml-auto w-fit rounded-xl"
            isDisabled={isDisabled}
          >
            초대하기
          </Button>
        </form>
      </div>
    </section>
  );
};

export default InviteModal;
