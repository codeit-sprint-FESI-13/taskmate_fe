import { ComponentProps, useState } from "react";
import z from "zod";

import {
  MyProfileFormData,
  myProfileSchema,
} from "@/features/my/types/myProfile.type";

import { useUpdateProfileMutation } from "../useUpdateProfileMutation";

export function useMyProfileForm(initialNickname: string) {
  const [values, setValues] = useState<MyProfileFormData>({
    nickname: initialNickname,
    currentPassword: null,
    password: null,
    passwordConfirm: null,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof MyProfileFormData, string>>
  >({});

  const { mutate: updateMyProfile, isPending } = useUpdateProfileMutation();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const toggleCurrentPassword = () => setShowCurrentPassword((prev) => !prev);
  const togglePassword = () => setShowPassword((prev) => !prev);
  const togglePasswordConfirm = () => setShowPasswordConfirm((prev) => !prev);

  const validateField = (
    name: keyof MyProfileFormData,
    targetValues: MyProfileFormData,
  ) => {
    const result = myProfileSchema.safeParse(targetValues);
    if (!result.success) {
      const fieldErrors = z.flattenError(result.error).fieldErrors;
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name]?.[0] ?? "" }));
    } else {
      const passwordFields = ["currentPassword", "password", "passwordConfirm"];
      if (passwordFields.includes(name)) {
        setErrors((prev) => ({
          ...prev,
          currentPassword: undefined,
        }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    }
  };

  const handleChange: ComponentProps<"input">["onChange"] = (e) => {
    const { name, value } = e.target;
    const newValues = { ...values, [name]: value };
    setValues(newValues);

    validateField(name as keyof MyProfileFormData, newValues);
  };

  const handleBlur: ComponentProps<"input">["onBlur"] = (e) => {
    const { name } = e.target;
    validateField(name as keyof MyProfileFormData, values);
  };

  const handleSubmit: ComponentProps<"form">["onSubmit"] = (e) => {
    e.preventDefault();

    const result = myProfileSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors = z.flattenError(result.error).fieldErrors;
      setErrors({
        nickname: fieldErrors.nickname?.[0] ?? "",
        currentPassword: fieldErrors.currentPassword?.[0] ?? "",
        password: fieldErrors.password?.[0] ?? "",
        passwordConfirm: fieldErrors.passwordConfirm?.[0] ?? "",
      });
      return;
    }

    const { passwordConfirm, ...myProfileData } = result.data;
    updateMyProfile(myProfileData);
  };

  return {
    values,
    errors,
    isPending,
    showCurrentPassword,
    showPassword,
    showPasswordConfirm,
    handleChange,
    handleBlur,
    toggleCurrentPassword,
    togglePassword,
    togglePasswordConfirm,
    handleSubmit,
  };
}
