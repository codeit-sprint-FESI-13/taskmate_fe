"use client";

import { useEffect, useState } from "react";

import { teamApi } from "@/entities/team";
import { useTeamId } from "@/features/team/hooks/useTeamId";
import Button from "@/shared/ui/Button/Button/Button";
import Input from "@/shared/ui/Input/Input";

const TeamNameEditor = () => {
  const [value, setValue] = useState("");
  const [initialName, setInitialName] = useState("");
  const teamId = Number(useTeamId());
  const isDisabled = value.trim() === initialName.trim();

  // teamId로 팀명 가져오기
  useEffect(() => {
    // @TODO: useTeamId 에서 처리
    if (Number.isNaN(teamId)) return;

    // @TODO: useSuspenseQuery 및 AsyncBoundary 사용
    teamApi
      .getDetail(teamId)
      .then((res) => {
        if (res?.data?.name) setValue(res.data.name);
        setInitialName(res.data.name);
      })
      .catch(() => {
        setValue("팀명");
      });
  }, [teamId]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextName = value.trim();
    // @TODO: useTeamId 에서 처리될 부분 분리
    if (Number.isNaN(teamId) || !nextName) return;

    // @TODO: useMutation 으로 리팩토링
    try {
      await teamApi.update(teamId, nextName);
      setValue(nextName);
      // @TODO: window.location.reload() 사용 금지, router.refresh() 사용
      window.location.reload();
    } catch (error) {
      // @TODO: console 제거
      console.log("팀명 수정 실패", error);
    }
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
