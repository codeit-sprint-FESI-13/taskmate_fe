import z from "zod";

export const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, "이메일을 입력해 주세요.")
      .check(z.email("이메일 형식이 올바르지 않습니다.")),
    nickname: z
      .string()
      .min(1, "이름을 입력해 주세요.")
      .regex(/^\S+$/, "공백은 포함할 수 없습니다.")
      .min(2, "이름은 2자 이상이어야 합니다.")
      .max(20, "이름은 최대 20자까지 입력 가능합니다."),
    password: z
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .max(20, "비밀번호는 최대 20자까지 입력 가능합니다.")
      .regex(/(?=.*[A-Za-z])/, "영문을 1자 이상 포함해야 합니다")
      .regex(/(?=.*\d)/, "숫자를 1자 이상 포함해야 합니다")
      .regex(/(?=.*[^A-Za-z0-9])/, "특수문자를 1자 이상 포함해야 합니다"),
    passwordConfirm: z.string().min(1, "비밀번호 확인을 입력해 주세요."),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;
