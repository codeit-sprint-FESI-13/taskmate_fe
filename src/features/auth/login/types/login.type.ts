import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해 주세요.")
    .check(z.email("이메일 형식이 올바르지 않습니다.")),
  password: z
    .string()
    .min(8, "비밀번호는 8자 이상이어야 합니다.")
    .max(20, "비밀번호는 최대 20자까지 입력 가능합니다.")
    .regex(/(?=.*[A-Za-z])/, "영문을 1자 이상 포함해야 합니다")
    .regex(/(?=.*\d)/, "숫자를 1자 이상 포함해야 합니다")
    .regex(/(?=.*[^A-Za-z0-9])/, "특수문자를 1자 이상 포함해야 합니다"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
