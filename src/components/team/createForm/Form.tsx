"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input";
import { TEAM_NAME_MAX_LENGTH } from "@/constants/team";
import { teamApi } from "@/features/team/api";
import type { ApiError } from "@/lib/api/types";

export default function Form() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nameInput = e.currentTarget.elements.namedItem("name");
    const name = nameInput instanceof HTMLInputElement ? nameInput.value : "";

    try {
      const response = await teamApi.create(name);

      if (response.success) {
        await queryClient.invalidateQueries({ queryKey: ["teams", "all"] });
        router.back();
      }
    } catch (error) {
      const apiError = error as ApiError;

      setErrorMessage(apiError.message);
    }
  };

  return (
    <form
      className="flex flex-col items-start justify-start gap-8"
      onSubmit={handleSubmit}
    >
      <label className="typography-heading-2 font-semibold">팀 이름</label>

      <Input
        name="name"
        required
        type="text"
        maxLength={TEAM_NAME_MAX_LENGTH}
        className="mobile:w-[303px] tablet:w-[496px]"
        placeholder="팀 이름을 입력해주세요"
        errorMessage={errorMessage ?? undefined}
      />

      <Button
        size="xl"
        type="submit"
        className="w-full"
      >
        생성하기
      </Button>
    </form>
  );
}
