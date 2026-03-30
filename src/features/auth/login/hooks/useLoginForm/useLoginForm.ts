import { ComponentProps, useState } from "react";

import { LoginFormData } from "@/features/auth/login/types/login.type";

const useLoginForm = () => {
  const [values, setValues] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleChange: ComponentProps<"input">["onChange"] = (e) => {
    const { name, value } = e.target;
    const newValues = { ...values, [name]: value };
    setValues(newValues);
  };

  return {
    values,
    showPassword,
    togglePassword,
    handleChange,
  };
};

export default useLoginForm;
