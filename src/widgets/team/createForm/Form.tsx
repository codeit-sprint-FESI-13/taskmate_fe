"use client";

import { TEAM_NAME_MAX_LENGTH } from "@/entities/team";
import { useCreateTeamForm } from "@/features/team";
import Button from "@/shared/ui/Button/Button/Button";
import Input from "@/shared/ui/Input/Input";

export default function Form() {
  const { handleSubmit, nameError } = useCreateTeamForm();

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="team-name"
          className="typography-heading-2 font-semibold"
        >
          팀 이름
        </label>
        <Input
          id="team-name"
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
        className="w-full break-keep"
      >
        생성하기
      </Button>
    </form>
  );
}
