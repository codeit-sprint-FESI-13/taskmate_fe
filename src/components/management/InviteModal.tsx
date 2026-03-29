"use client";

import { useEffect, useState } from "react";

import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";

interface InviteModalProps {
  onClose: () => void;
}

const InviteModal = ({ onClose }: InviteModalProps) => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const handleInvite = () => {
    onClose();
  };

  return (
    <section className="fixed inset-0 z-9999 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative flex w-112.5 flex-col gap-8 rounded-2xl bg-white p-8 shadow-lg">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 w-fit cursor-pointer self-end text-2xl"
        >
          x
        </button>
        <h2>팀원 초대</h2>

        <Input
          placeholder="초대하실 분의 이메일을 입력해주세요."
          className="rounded-4 border border-gray-200 p-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          type="submit"
          className="ml-auto w-fit rounded-xl"
          onClick={handleInvite}
        >
          초대하기
        </Button>
      </div>
    </section>
  );
};

export default InviteModal;
