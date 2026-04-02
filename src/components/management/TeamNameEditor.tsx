"use client";

import { useEffect, useState } from "react";

import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import { teamDetailApi } from "@/features/management/api";
import { useTeamId } from "@/features/team/hooks/useTeamId";

const TeamNameEditor = () => {
  const [value, setValue] = useState("");
  const teamId = Number(useTeamId());

  // teamId로 팀명 가져오기
  useEffect(() => {
    if (Number.isNaN(teamId)) return;

    teamDetailApi
      .read(teamId)
      .then((res) => {
        if (res?.data?.name) setValue(res.data.name);
      })
      .catch(() => {
        setValue("팀명");
      });
  }, [teamId]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextName = value.trim();
    if (Number.isNaN(teamId) || !nextName) return;

    try {
      await teamDetailApi.create(teamId, nextName);
      setValue(nextName);
    } catch (error) {
      console.log("팀명 수정 실패", error);
    }
  };

  return (
    <section className="bg-background-normal flex h-46.5 w-full flex-col gap-2 rounded-4xl px-6 pt-6 pb-5">
      <h2 className="typography-body-2">팀명</h2>
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit}
      >
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <Button
          className="ml-auto w-fit rounded-xl"
          type="submit"
        >
          저장하기
        </Button>
      </form>
    </section>
  );
};

export default TeamNameEditor;
