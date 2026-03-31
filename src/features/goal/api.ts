import { apiClient } from "@/lib/api/client";

import type {
  CreateGoalResponse,
  CreatePersonalGoalInput,
  CreateTeamGoalInput,
} from "./types";

export const goalApi = {
  createPersonalGoal: (data: CreatePersonalGoalInput) =>
    apiClient.post<CreateGoalResponse>("/goals", data),

  createTeamGoal: (data: CreateTeamGoalInput) =>
    apiClient.post<CreateGoalResponse>("/goals", data),
};
