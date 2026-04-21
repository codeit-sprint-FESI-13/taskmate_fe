"use client";

import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { teamApi } from "@/entities/team/api/req/api";
import type { ApiError } from "@/shared/utils/api/types";

import { ResponseCreateTeam } from "../../../entities/team/types/types";

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
