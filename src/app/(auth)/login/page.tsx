import React from "react";

import LoginForm from "@/components/auth/Login/LoginForm";
import SnsLoginButtons from "@/components/auth/SnsLoginButtons";

const LoginPage = () => {
  return (
    <>
      <LoginForm />
      <SnsLoginButtons
        label="SNS 계정으로 로그인"
        type="login"
      />
    </>
  );
};

export default LoginPage;
