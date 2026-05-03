import z from "zod";

export const inviteEmailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "이메일을 입력해주세요.")
    .email("올바른 이메일 형식이 아닙니다."),
});

export type InviteEmailInput = z.infer<typeof inviteEmailSchema>;
