import { useMutation, useQueryClient } from "@tanstack/react-query";

import { goalApi } from "../api";

type UpdateGoalVariables = {
  name: string;
  dueDate: string;
};

type UseUpdateGoalMutationOptions = {
  goalId: string;
  teamId: string | null;
  onUpdated?: () => void;
};

export function useUpdateGoalMutation({
  goalId,
  teamId,
  onUpdated,
}: UseUpdateGoalMutationOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, dueDate }: UpdateGoalVariables) =>
      goalApi.updateGoal(goalId, { name, dueDate }),
    onSuccess: () => {
      onUpdated?.();
      queryClient.invalidateQueries({ queryKey: ["goal", goalId, "summary"] });
      queryClient.invalidateQueries({ queryKey: ["personal", "goals"] });
      if (teamId) {
        queryClient.invalidateQueries({ queryKey: ["team", teamId, "goals"] });
      }
    },
  });
}
