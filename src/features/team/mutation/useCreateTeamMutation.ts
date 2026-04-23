"use client";

import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { teamApi } from "@/entities/team";
import type { ApiError, ApiResponse } from "@/shared/lib/api/types";

type UseCreateTeamMutationParams = UseMutationOptions<
  ApiResponse<null>,
  ApiError,
  string,
  unknown
>;

export const useCreateTeamMutation = (options: UseCreateTeamMutationParams) => {
  return useMutation({
    mutationFn: teamApi.create,
    ...options,
  });
};
