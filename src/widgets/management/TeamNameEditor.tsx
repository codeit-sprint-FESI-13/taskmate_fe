"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";

import { createTeamSchema, managementQueryOptions } from "@/entities/team";
import { useUpdateTeamNameMutation } from "@/features/management";
import { useTeamId } from "@/features/team";
import Button from "@/shared/ui/Button/Button/Button";
import Input from "@/shared/ui/Input/Input";

const TeamNameEditor = () => {
  const teamId = Number(useTeamId());
  const { data: teamDetail } = useSuspenseQuery(
    managementQueryOptions.teamDetail(teamId),
  );

  const [value, setValue] = useState(teamDetail.name);
  const isDisabled = value.trim() === teamDetail.name;

  const { mutate: updateTeamName } = useUpdateTeamNameMutation({
    onSuccess: () => window.location.reload(),
  });

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Number.isNaN(teamId)) return;
    const result = createTeamSchema.safeParse({ name: value });
    if (!result.success) return;
    updateTeamName({ teamId, name: result.data.name });
  };

  return (
    <section className="tablet:w-full bg-background-normal tablet:gap-2 flex h-46.5 w-83.75 flex-col gap-2.5 rounded-4xl px-6 pt-6 pb-5">
      <h2 className="typography-label-1 tablet:typography-body-1">팀명</h2>
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit}
      >
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="typhography-label-1 tablet:typography-body-2"
        />
        <Button
          className="ml-auto w-fit rounded-xl"
          type="submit"
          isDisabled={isDisabled}
        >
          저장하기
        </Button>
      </form>
    </section>
  );
};

export default TeamNameEditor;
