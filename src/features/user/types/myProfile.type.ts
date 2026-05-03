import z from "zod";

export const myProfileSchema = z
  .object({
    nickname: z
      .string()
      .min(1, "이름을 입력해 주세요.")
      .regex(/^\S+$/, "공백은 포함할 수 없습니다.")
      .regex(/^[^<>{}]*$/, "사용할 수 없는 문자가 포함되어 있습니다.")
      .min(2, "이름은 2자 이상이어야 합니다.")
      .max(20, "이름은 최대 20자까지 입력 가능합니다."),
    currentPassword: z.string().min(1).nullable().optional(),
    password: z
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .max(20, "비밀번호는 최대 20자까지 입력 가능합니다.")
      .regex(/(?=.*[A-Za-z])/, "영문을 1자 이상 포함해야 합니다")
      .regex(/(?=.*\d)/, "숫자를 1자 이상 포함해야 합니다")
      .regex(/(?=.*[^A-Za-z0-9])/, "특수문자를 1자 이상 포함해야 합니다")
      .nullable()
      .optional(),
    passwordConfirm: z.string().nullable().optional(),
  })
  .refine(
    (data) => {
      const filled =
        data.currentPassword || data.password || data.passwordConfirm;
      if (!filled) return true;
      return (
        !!data.currentPassword && !!data.password && !!data.passwordConfirm
      );
    },
    {
      message: "비밀번호 변경 시 모든 항목을 입력해 주세요.",
      path: ["currentPassword"],
    },
  )
  .refine((data) => !data.password || data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  })
  .refine((data) => !data.password || data.password !== data.currentPassword, {
    message: "이전에 사용했던 비밀번호는 설정할 수 없어요.",
    path: ["password"],
  });

export type MyProfileFormData = z.infer<typeof myProfileSchema>;
