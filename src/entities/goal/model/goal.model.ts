import z from "zod";

export const createGoalSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "목표 이름을 입력해주세요.")
    .max(30, "목표 이름은 30자 이내로 입력해주세요."),
  date: z.string().min(1, "날짜를 선택해주세요."),
});
