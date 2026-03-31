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
