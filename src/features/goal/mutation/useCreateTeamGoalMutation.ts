import { useMutation, useQueryClient } from "@tanstack/react-query";

import { goalApi } from "@/entities/goal";

type CreateTeamGoalVariables = {
  name: string;
  dueDate: string;
  teamId: number;
};

type UseCreateTeamGoalMutationOptions = {
  onSuccess?: () => void;
};

export function useCreateTeamGoalMutation({
  onSuccess,
}: UseCreateTeamGoalMutationOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, dueDate, teamId }: CreateTeamGoalVariables) =>
      goalApi.createGoal({ name, dueDate, teamId, type: "TEAM" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams", "all"] });
      onSuccess?.();
    },
  });
}
