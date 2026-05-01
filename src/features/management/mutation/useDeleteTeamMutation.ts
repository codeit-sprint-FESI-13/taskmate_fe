import { useMutation } from "@tanstack/react-query";

import { teamApi } from "@/entities/team";

type UseDeleteTeamMutationOptions = {
  onSuccess?: () => void;
};

export function useDeleteTeamMutation({
  onSuccess,
}: UseDeleteTeamMutationOptions = {}) {
  return useMutation({
    mutationFn: (teamId: number) => teamApi.deleteTeam(teamId),
    onSuccess: () => {
      onSuccess?.();
    },
  });
}
