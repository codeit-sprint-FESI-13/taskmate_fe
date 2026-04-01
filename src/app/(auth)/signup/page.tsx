import { Suspense } from "react";

import SignupForm from "@/components/auth/Signup/SignupForm";
import SnsLoginButtons from "@/components/auth/SnsLoginButtons";

export default function SignupPage() {
  return (
    // useSearchParams() 사용으로 인한 CSR Suspense 추가
    // TODO: 공통 스켈레톤 UI 컴포넌트 구현 후 fallback으로 교체
    <Suspense fallback={null}>
      <SignupForm />
      <SnsLoginButtons
        label="SNS 계정으로 회원가입"
        type="signup"
      />
    </Suspense>
  );
}
