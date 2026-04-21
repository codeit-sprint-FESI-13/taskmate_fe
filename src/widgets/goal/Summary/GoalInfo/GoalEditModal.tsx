"use client";

import { useState } from "react";

import { createGoalCreateSchema } from "@/entities/goal/types/types";
import Button from "@/shared/ui/Button/Button/Button";
import TextButton from "@/shared/ui/Button/TextButton/TextButton";
import Input from "@/shared/ui/Input/Input";
import { Modal } from "@/shared/ui/Modal";
import { cn } from "@/shared/utils/styles/cn";

export type GoalEditModalProps = {
  initialName: string;
  initialDueDate: string;
  onClose: () => void;
  onSave: (input: { name: string; dueDate: string }) => void;
  isPending: boolean;
};

export function GoalEditModal({
  initialName,
  initialDueDate,
  onClose,
  onSave,
  isPending,
}: GoalEditModalProps) {
  const [name, setName] = useState(initialName);
  const [dueDate, setDueDate] = useState(initialDueDate);
  const [nameError, setNameError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsed = createGoalCreateSchema.safeParse({
      name,
      date: dueDate,
    });
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setNameError(fieldErrors.name?.[0] ?? "");
      return;
    }
    setNameError("");
    onSave({ name: parsed.data.name, dueDate: parsed.data.date });
  };

  return (
    <Modal.Root onClose={onClose}>
      <Modal.Backdrop />
      <Modal.Content className={cn("max-w-[400px]")}>
        <Modal.Title>목표 수정</Modal.Title>
        <form
          className="mt-6 flex w-full flex-col gap-5"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full flex-col items-start gap-1">
            <label
              htmlFor="goal-edit-name"
              className="typography-body-2 text-label-neutral font-semibold"
            >
              목표 이름
            </label>
            <div className="w-full">
              <Input
                id="goal-edit-name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="목표 이름을 입력해주세요"
                errorMessage={nameError}
                disabled={isPending}
                autoComplete="off"
              />
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-1">
            <label
              htmlFor="goal-edit-due"
              className="typography-body-2 text-label-neutral font-semibold"
            >
              마감일
            </label>
            <div className="w-full">
              <Input
                id="goal-edit-due"
                name="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                disabled={isPending}
              />
            </div>
          </div>
          <Modal.Actions className="mt-2 flex flex-col gap-2">
            <Button
              variant="primary"
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              저장하기
            </Button>
            <TextButton
              variant="primary"
              type="button"
              className="w-full"
              onClick={onClose}
              disabled={isPending}
            >
              취소
            </TextButton>
          </Modal.Actions>
        </form>
      </Modal.Content>
    </Modal.Root>
  );
}
