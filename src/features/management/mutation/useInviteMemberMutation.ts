import { useMutation } from "@tanstack/react-query";

import { teamApi } from "@/entities/team";

type UseInviteMemberMutationOptions = {
  onSuccess?: () => void;
};

export function useInviteMemberMutation({
  onSuccess,
}: UseInviteMemberMutationOptions = {}) {
  return useMutation({
    mutationFn: ({ teamId, email }: { teamId: string; email: string }) =>
      teamApi.createInvitation(teamId, email),
    onSuccess: () => {
      onSuccess?.();
    },
  });
}
