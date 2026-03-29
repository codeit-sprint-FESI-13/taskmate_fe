import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { signupMutationFn } from "@/features/auth/signup/api/signup.api";

export function useSignupMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: signupMutationFn,
    onSuccess: (data) => {
      console.log("회원가입성공!");
    },
    onError: (error) => {
      console.error(JSON.stringify(error));
    },
  });
}
