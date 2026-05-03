"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { teamApi, teamQueryOptions } from "@/entities/team";
import type { ApiError } from "@/shared/lib/api/types";

type UseCreateTeamMutationOptions = {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
};

export const useCreateTeamMutation = ({
  onSuccess,
  onError,
}: UseCreateTeamMutationOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: teamApi.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: teamQueryOptions.all().queryKey,
      });
      onSuccess?.();
    },
    onError,
  });
};
