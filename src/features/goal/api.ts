import { apiClient } from "@/lib/api/client";

import type {
  CreateGoalResponse,
  CreatePersonalGoalInput,
  CreateTeamGoalInput,
  PersonalGoalListResponse,
} from "./types";

export const goalApi = {
  createPersonalGoal: (data: CreatePersonalGoalInput) =>
    apiClient.post<CreateGoalResponse>("/goals", data),

  createTeamGoal: (data: CreateTeamGoalInput) =>
    apiClient.post<CreateGoalResponse>("/goals", data),

  getPersonalGoalList: () =>
    apiClient.get<PersonalGoalListResponse>("/goals/personal"),
};
