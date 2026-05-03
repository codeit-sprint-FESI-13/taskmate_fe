"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { teamApi, teamQueryOptions } from "@/entities/team";
import type { ApiError } from "@/shared/lib/api/types";

type UseLeaveTeamMutationOptions = {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
};

export const useLeaveTeamMutation = ({
  onSuccess,
  onError,
}: UseLeaveTeamMutationOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (teamId: string) => teamApi.quitTeam(teamId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: teamQueryOptions.all().queryKey,
      });
      onSuccess?.();
    },
    onError,
  });
};
