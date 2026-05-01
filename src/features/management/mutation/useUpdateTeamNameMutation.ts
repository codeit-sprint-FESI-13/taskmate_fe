import { useMutation, useQueryClient } from "@tanstack/react-query";

import { teamApi } from "@/entities/team";

type UseUpdateTeamNameMutationOptions = {
  onSuccess?: () => void;
};

export function useUpdateTeamNameMutation({
  onSuccess,
}: UseUpdateTeamNameMutationOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ teamId, name }: { teamId: number; name: string }) =>
      teamApi.update(teamId, name),
    onSuccess: (_, { teamId }) => {
      queryClient.invalidateQueries({
        queryKey: ["management", teamId, "detail"],
      });
      onSuccess?.();
    },
  });
}
