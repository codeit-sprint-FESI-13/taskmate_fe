import React, { Suspense } from "react";

import LoginForm from "@/components/auth/Login/LoginForm";
import SnsLoginButtons from "@/components/auth/SnsLoginButtons";

const LoginPage = () => {
  return (
    // useSearchParams() 사용으로 인한 CSR Suspense 추가
    // TODO: 공통 스켈레톤 UI 컴포넌트 구현 후 fallback으로 교체
    <Suspense fallback={null}>
      <LoginForm />
      <SnsLoginButtons
        label="SNS 계정으로 로그인"
        type="login"
      />
    </Suspense>
  );
};

export default LoginPage;
