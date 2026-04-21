"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import { useToast } from "@/shared/hooks/useToast";

import { useCreateTodoMutation } from "../mutation/useCreateTodoMutation";

interface UseCreateTodoFormParams {
  goalId: string;
  onSuccess: () => void;
  initialAssigneeIds?: number[];
}

export const useCreateTodoForm = ({
  goalId,
  onSuccess,
  initialAssigneeIds,
}: UseCreateTodoFormParams) => {
  const [assigneeIds, setAssigneeIds] = useState<number[]>(
    initialAssigneeIds ?? [],
  );
  const [startDate, setStartDate] = useState("");
  const { toast } = useToast();
  const { mutate: createTodo, isPending } = useCreateTodoMutation();

  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = String(formData.get("title") ?? "");
    const formStartDate = String(formData.get("startDate") ?? "");
    const dueDate = String(formData.get("dueDate") ?? "");
    const memo = String(formData.get("memo") ?? "");

    if (formStartDate && dueDate && dueDate < formStartDate) {
      toast({
        variant: "error",
        title: "날짜 입력 오류",
        description: "마감 날짜는 시작 날짜보다 빠를 수 없습니다.",
      });

      return;
    }

    createTodo(
      {
        goalId,
        todoData: {
          title,
          startDate: formStartDate,
          dueDate,
          assigneeIds,
          memo,
        },
      },
      {
        onSuccess,
      },
    );
  };

  return {
    assigneeIds,
    setAssigneeIds,
    startDate,
    handleStartDateChange,
    handleSubmit,
    isPending,
  };
};
