"use client";

import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input";
import { TEAM_NAME_MAX_LENGTH } from "@/constants/team";
import { useCreateTeamForm } from "@/features/team/hooks/useCreateTeamForm";

export default function Form() {
  const { handleSubmit, nameError } = useCreateTeamForm();

  return (
    <form
      className="flex flex-col items-start justify-start gap-8"
      onSubmit={handleSubmit}
    >
      <label className="typography-heading-2 font-semibold">팀 이름</label>

      <div className="w-full">
        <Input
          name="name"
          required
          type="text"
          maxLength={TEAM_NAME_MAX_LENGTH}
          placeholder="팀 이름을 입력해주세요"
          errorMessage={nameError}
        />
      </div>

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
