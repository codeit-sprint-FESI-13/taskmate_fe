import SignupForm from "@/components/auth/Signup/SignupForm";
import SnsLoginButtons from "@/components/auth/SnsLoginButtons";

export default function SignupPage() {
  return (
    <>
      <SignupForm />
      <SnsLoginButtons label="SNS 계정으로 회원가입" />
    </>
  );
}
