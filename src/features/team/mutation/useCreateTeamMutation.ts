"use client";

import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { teamApi } from "@/entities/team/api/api";
import { ResponseCreateTeam } from "@/entities/team/types/types";
import type { ApiError } from "@/shared/lib/api/types";

type UseCreateTeamMutationParams = UseMutationOptions<
  ResponseCreateTeam,
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
