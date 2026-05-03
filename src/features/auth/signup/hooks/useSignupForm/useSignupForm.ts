import { ComponentProps, useState } from "react";
import z from "zod";

import { useSignupMutation } from "@/features/auth/mutation/useSignupMutation";
import { useEmailDuplicate } from "@/features/auth/signup/hooks/useEmailDuplicate";
import {
  SignupFormData,
  signupSchema,
} from "@/features/auth/signup/types/signup.type";
import { useToast } from "@/shared/hooks/useToast";

const useSignupForm = () => {
  const [values, setValues] = useState<SignupFormData>({
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof SignupFormData, string>>
  >({});

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);
  const togglePasswordConfirm = () => setShowPasswordConfirm((prev) => !prev);

  const [isEmailChecked, setIsEmailChecked] = useState(false);

  const { mutateAsync: checkEmail, reset } = useEmailDuplicate();
  const { mutate: signup } = useSignupMutation();

  const { toast } = useToast();

  const validateField = (
    name: keyof SignupFormData,
    targetValues: SignupFormData,
  ) => {
    const result = signupSchema.safeParse(targetValues);
    if (!result.success) {
      const fieldErrors = z.flattenError(result.error).fieldErrors;
      setErrors((prev) => ({
        ...prev,
        [name]: fieldErrors[name]?.[0] ?? "",
      }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit: ComponentProps<"form">["onSubmit"] = (e) => {
    e.preventDefault();

    const result = signupSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors = z.flattenError(result.error).fieldErrors;
      setErrors({
        nickname: fieldErrors.nickname?.[0] ?? "",
        email: fieldErrors.email?.[0] ?? "",
        password: fieldErrors.password?.[0] ?? "",
        passwordConfirm: fieldErrors.passwordConfirm?.[0] ?? "",
      });
      return;
    }

    if (!isEmailChecked) {
      setErrors((prev) => ({ ...prev, email: "이메일 중복 확인을 해주세요." }));
      return;
    }

    const { passwordConfirm, ...signupData } = result.data;
    signup(signupData);
  };

  const handleChange: ComponentProps<"input">["onChange"] = (e) => {
    const { name, value } = e.target;
    const newValues = { ...values, [name]: value };
    setValues(newValues);

    if (name === "email") {
      reset();
      setIsEmailChecked(false);
    }

    validateField(name as keyof SignupFormData, newValues);
  };

  const handleBlur: ComponentProps<"input">["onBlur"] = (e) => {
    const { name } = e.target;
    validateField(name as keyof SignupFormData, values);
  };

  const handleEmailDuplicate = async () => {
    try {
      const result = await checkEmail(values.email);
      if (result.data.exists) {
        setErrors((prev) => ({
          ...prev,
          email: "이미 사용중인 이메일입니다.",
        }));
        setIsEmailChecked(false);
      } else {
        setErrors((prev) => ({ ...prev, email: undefined }));
        setIsEmailChecked(true);
      }
    } catch (error) {
      toast({ title: "이메일 확인 중 오류가 발생했습니다.", variant: "error" });
    }
  };

  return {
    values,
    errors,
    showPassword,
    showPasswordConfirm,
    togglePassword,
    togglePasswordConfirm,
    handleSubmit,
    handleChange,
    handleBlur,
    handleEmailDuplicate,
    isEmailChecked,
  };
};

export default useSignupForm;
