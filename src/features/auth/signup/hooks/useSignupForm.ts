import { ComponentProps, useState } from "react";
import z from "zod";

import { SignupFormData, signupSchema } from "../types/signup.type";

const useSignupForm = () => {
  const [values, setValues] = useState<SignupFormData>({
    name: "",
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
        name: fieldErrors.name?.[0] ?? "",
        email: fieldErrors.email?.[0] ?? "",
        password: fieldErrors.password?.[0] ?? "",
        passwordConfirm: fieldErrors.passwordConfirm?.[0] ?? "",
      });
      return;
    }
  };

  const handleChange: ComponentProps<"input">["onChange"] = (e) => {
    const { name, value } = e.target;
    const newValues = { ...values, [name]: value };
    setValues(newValues);

    validateField(name as keyof SignupFormData, newValues);
  };

  const handleBlur: ComponentProps<"input">["onBlur"] = (e) => {
    const { name } = e.target;
    validateField(name as keyof SignupFormData, values);
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
  };
};

export default useSignupForm;
