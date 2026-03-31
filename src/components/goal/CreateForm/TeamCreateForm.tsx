"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input";
import { Spacing } from "@/components/common/Spacing";
import TextButton from "@/components/common/TextButton/TextButton";
import { goalApi } from "@/features/goal/api";
import { createTeamGoalSchema } from "@/features/goal/types";
import { useTeamId } from "@/features/team/hooks/useTeamId";

export const TeamCreateForm = () => {
  const router = useRouter();
  const teamId = useTeamId();
  const [goalNameError, setGoalNameError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const parsed = createTeamGoalSchema.safeParse({
      name: String(formData.get("name") ?? ""),
      date: String(formData.get("date") ?? ""),
    });

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setGoalNameError(fieldErrors.name?.[0] ?? "");
      return;
    }

    setGoalNameError("");

    goalApi.createTeamGoal({
      name: parsed.data.name,
      dueDate: parsed.data.date,
      teamId: Number(teamId),
      type: "TEAM",
    });

    router.back();
  };

  return (
    <form
      className="flex w-full flex-col items-start justify-start gap-8 p-8 pt-10"
      onSubmit={handleSubmit}
    >
      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full flex-col items-start gap-1">
          <label className="typography-heading-2 text-label-neutral font-semibold">
            목표 이름
          </label>

          <Spacing size={20} />

          <div className="w-full">
            <Input
              name="goalName"
              required
              type="text"
              placeholder="목표 이름을 입력해주세요"
              errorMessage={goalNameError}
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-1">
          <div className="w-full">
            <Input
              name="date"
              required
              type="date"
              placeholder="날짜를 선택해주세요"
            />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-center">
        <Button
          size="xl"
          type="submit"
          className="w-full"
        >
          생성하기
        </Button>
        <TextButton
          size="lg"
          className="mt-4 self-center"
          type="button"
          onClick={() => router.back()}
        >
          <span className="typography-body-2 text-gray-400">취소하기</span>
        </TextButton>
      </div>
    </form>
  );
};
