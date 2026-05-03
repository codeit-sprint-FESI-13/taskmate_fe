import SignupForm from "@/widgets/auth/Signup/SignupForm";
import SnsLoginButtons from "@/widgets/auth/SnsLoginButtons";

export default function SignupPage() {
  return (
    <>
      <SignupForm />
      <SnsLoginButtons
        label="SNS 계정으로 회원가입"
        type="signup"
      />
    </>
  );
}
