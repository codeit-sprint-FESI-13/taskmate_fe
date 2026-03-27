import { ComponentProps, useState } from "react";
import z from "zod";

import {
  LoginFormData,
  loginSchema,
} from "@/features/auth/login/types/login.type";

const useLoginForm = () => {
  const [values, setValues] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof LoginFormData, string>>
  >({});

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleChange: ComponentProps<"input">["onChange"] = (e) => {
    const { name, value } = e.target;
    const newValues = { ...values, [name]: value };
    setValues(newValues);

    const result = loginSchema.safeParse(newValues);
    if (!result.success) {
      const fieldErrors = z.flattenError(result.error).fieldErrors;
      setErrors((prev) => ({
        ...prev,
        [name]: fieldErrors[name as keyof LoginFormData]?.[0] ?? "",
      }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  const handleSubmit: ComponentProps<"form">["onSubmit"] = (e) => {
    e.preventDefault();

    const result = loginSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors = z.flattenError(result.error).fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0] ?? "",
        password: fieldErrors.password?.[0] ?? "",
      });
      return;
    }
  };

  return {
    values,
    errors,
    showPassword,
    togglePassword,
    handleChange,
    handleSubmit,
  };
};

export default useLoginForm;
