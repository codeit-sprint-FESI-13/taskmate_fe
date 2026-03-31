import { useMutation } from "@tanstack/react-query";

import { useToast } from "@/hooks/useToast";
import type { ApiError } from "@/lib/api/types";

import { todoApi } from "../../api";
import { CreateTodoInput } from "../../types";

type CreateTodoVariables = {
  goalId: string;
  todoData: CreateTodoInput;
};

export const useCreateTodoMutation = () => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: ({ goalId, todoData }: CreateTodoVariables) =>
      todoApi.create(goalId, todoData),
    throwOnError: false,
    onSuccess: () => {
      // @TODO: todo 목록 querykey 생성 이후 무효화 처리 필요
      // queryClient.invalidateQueries({ queryKey: ["todos"] });
      // @TODO: 새로고침 필요 여부도 확인
      toast({
        title: "할 일 생성 완료",
        description: "할 일이 생성되었습니다.",
        variant: "success",
      });
    },
    onError: (error: ApiError) => {
      toast({
        variant: "error",
        title: "할 일 생성 실패",
        description: error.message ?? "잠시 후 다시 시도해주세요.",
      });
    },
  });
};
