import z from "zod";

export const createGoalCreateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "목표 이름을 입력해주세요.")
    .max(30, "목표 이름은 30자 이내로 입력해주세요."),
  date: z.string().min(1, "날짜를 선택해주세요."),
});

interface CreateGoalInput {
  name: string;
  dueDate: string;
}

export interface CreatePersonalGoalInput extends CreateGoalInput {
  type: "PERSONAL";
}

export interface CreateTeamGoalInput extends CreateGoalInput {
  teamId: number;
  type: "TEAM";
}

export interface CreateGoalResponse {
  success: boolean;
}

export interface PersonalGoalListResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    goalId: number;
    goalName: string;
  }[];
}

export type SortType = "LATEST" | "OLDEST";

export interface GoalListCursor {
  cursorCreatedAt: string;
  cursorId: number;
}

export interface TeamGoalListItem {
  goalId: number;
  name: string;
  progressPercent: number;
  isFavorite: boolean;
  createdAt: string;
}

export interface TeamGoalListResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    items: TeamGoalListItem[];
    nextCursor: GoalListCursor | null;
    size: number;
  };
}

export interface GoalSummaryResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    goalId: number;
    goalName: string;
    dueDate: string;
    dDay: number;
    progressPercent: number;
  };
}
