import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { goalApi } from "../../../entities/goal/api/req/api";

type UseDeleteGoalMutationOptions = {
  goalId: string;
  teamId: string | null;
  onDeleted?: () => void;
};

export function useDeleteGoalMutation({
  goalId,
  teamId,
  onDeleted,
}: UseDeleteGoalMutationOptions) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => goalApi.deleteGoal(goalId),
    onSuccess: () => {
      onDeleted?.();
      queryClient.invalidateQueries({ queryKey: ["personal", "goals"] });
      if (teamId) {
        queryClient.invalidateQueries({ queryKey: ["team", teamId, "goals"] });
        router.replace(`/taskmate/team/${teamId}`);
      } else {
        router.replace("/taskmate/personal");
      }
    },
  });
}
