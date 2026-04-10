import z from "zod";

import { TEAM_NAME_MAX_LENGTH } from "@/constants/team";
import { ApiResponse } from "@/lib/api/types";

export const createTeamSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "팀 이름을 입력해주세요.")
    .max(
      TEAM_NAME_MAX_LENGTH,
      `팀 이름은 ${TEAM_NAME_MAX_LENGTH}자 이내로 입력해주세요.`,
    ),
});

export type ResponseCreateTeam = ApiResponse<void>;

export interface TeamSummary {
  teamId: number;
  teamName: string;
  isAdmin: boolean;
  todayProgressPercent: number;
  todayTodoCount: number;
  overdueTodoCount: number;
  doneTodoCount: number;
}

export interface ResponseTeamSummary {
  success: boolean;
  code: string;
  message: string;
  data: TeamSummary;
  timestamp: Date;
}

export interface ResponseQuitTeam {
  success: boolean;
}

export interface ResponseTeamList {
  success: boolean;
  code: string;
  message: string;
  data: {
    teamId: number;
    teamName: string;
    goals: {
      goalId: number;
      goalName: string;
    }[];
  }[];
}

export interface Member {
  id: number;
  userId: number;
  userEmail: string;
  profileImageUrl: string | null;
  userNickname: string;
  role: "ADMIN" | "MEMBER";
  joinedAt: string;
}

export interface ResponseMemberList {
  success: boolean;
  code: string;
  message: string;
  data: Member[];
}

export interface ResponseTeamList {
  success: boolean;
  code: string;
  message: string;
  data: {
    teamId: number;
    teamName: string;
    goals: {
      goalId: number;
      goalName: string;
    }[];
  }[];
}
