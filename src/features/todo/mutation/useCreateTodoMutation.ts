import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import type { CreateTodoRequest } from "@/entities/todo";
import { todoApi } from "@/entities/todo";
import { useToast } from "@/shared/hooks/useToast";
import type { ApiError } from "@/shared/lib/api/types";

type CreateTodoVariables = {
  goalId: string;
  todoData: CreateTodoRequest;
};

export const useCreateTodoMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: ({ goalId, todoData }: CreateTodoVariables) =>
      todoApi.create(goalId, todoData),
    throwOnError: false,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["todo", variables.goalId, "list"],
      });

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
