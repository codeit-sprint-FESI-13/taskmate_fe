import { useMutation, useQueryClient } from "@tanstack/react-query";

import { todoApi } from "@/entities/todo";
import { useToast } from "@/shared/hooks/useToast";
import type { ApiError } from "@/shared/lib/api/types";

type UseDeleteTodoMutationOptions = {
  onSuccess?: () => void;
};

type DeleteTodoVariables = {
  goalId: string;
  todoId: string;
};

export const useDeleteTodoMutation = ({
  onSuccess,
}: UseDeleteTodoMutationOptions = {}) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ goalId, todoId }: DeleteTodoVariables) =>
      todoApi.delete(goalId, todoId),
    throwOnError: false,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["todo", variables.goalId, "list"],
      });
      toast({
        title: "할 일 삭제 완료",
        description: "할 일이 삭제되었습니다.",
        variant: "success",
      });
      onSuccess?.();
    },
    onError: (error: ApiError) => {
      toast({
        variant: "error",
        title: "할 일 삭제 실패",
        description: error.message ?? "잠시 후 다시 시도해주세요.",
      });
    },
  });
};
