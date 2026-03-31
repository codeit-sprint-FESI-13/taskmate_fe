"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import { teamDetailApi } from "@/features/management/api";

const TeamNameEditor = () => {
  const [value, setValue] = useState("");
  const [teamNamePlaceholder, setTeamNamePlaceholder] = useState("팀명");
  const params = useParams();

  // teamId로 팀명 가져오기
  useEffect(() => {
    const teamId = Number(params.teamId);
    if (!teamId || Number.isNaN(teamId)) return;

    teamDetailApi
      .read(teamId)
      .then((res) => {
        if (res?.data?.name) setTeamNamePlaceholder(res.data.name);
      })
      .catch(() => {
        setTeamNamePlaceholder("팀명");
      });
  }, [params.teamId]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const teamId = Number(params.teamId);
    const nextName = value.trim();

    if (Number.isNaN(teamId) || !nextName) return;

    try {
      await teamDetailApi.create(teamId, nextName);
      setTeamNamePlaceholder(nextName);
      setValue("");
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
          placeholder={teamNamePlaceholder}
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
