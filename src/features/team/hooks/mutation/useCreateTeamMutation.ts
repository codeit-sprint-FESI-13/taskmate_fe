"use client";

import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { teamApi } from "@/features/team/api";
import type { ApiError } from "@/lib/api/types";

import { ResponseCreateTeam } from "../../types";

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
