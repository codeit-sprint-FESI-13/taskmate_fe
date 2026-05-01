import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { MemberRole } from "@/entities/team";
import { teamApi } from "@/entities/team";

type UseUpdateMemberRoleMutationOptions = {
  teamId: number;
  onSuccess?: () => void;
};

export function useUpdateMemberRoleMutation({
  teamId,
  onSuccess,
}: UseUpdateMemberRoleMutationOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ memberId, role }: { memberId: number; role: MemberRole }) =>
      teamApi.updateMemberRole(teamId, memberId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["management", teamId, "memberList"],
      });
      onSuccess?.();
    },
  });
}
