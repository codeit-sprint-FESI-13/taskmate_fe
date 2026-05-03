import { useMutation, useQueryClient } from "@tanstack/react-query";

import { goalApi } from "@/entities/goal";

type CreatePersonalGoalVariables = {
  name: string;
  dueDate: string;
};

type UseCreatePersonalGoalMutationOptions = {
  onSuccess?: () => void;
};

export function useCreatePersonalGoalMutation({
  onSuccess,
}: UseCreatePersonalGoalMutationOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, dueDate }: CreatePersonalGoalVariables) =>
      goalApi.createGoal({ name, dueDate, type: "PERSONAL" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["personal", "goals"] });
      onSuccess?.();
    },
  });
}
