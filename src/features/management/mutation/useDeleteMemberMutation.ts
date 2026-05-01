import { useMutation, useQueryClient } from "@tanstack/react-query";

import { teamApi } from "@/entities/team";

type UseDeleteMemberMutationOptions = {
  teamId: number;
  onSuccess?: () => void;
};

export function useDeleteMemberMutation({
  teamId,
  onSuccess,
}: UseDeleteMemberMutationOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberId: number) => teamApi.deleteMember(teamId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["management", teamId, "memberList"],
      });
      onSuccess?.();
    },
  });
}
