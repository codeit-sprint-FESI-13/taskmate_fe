import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { signupMutationFn } from "@/features/auth/signup/api/signup.api";
import { useToast } from "@/hooks/useToast";
import { ApiError } from "@/lib/api/types";

export function useSignupMutation() {
  const { toast } = useToast();
  const router = useRouter();

  // TODO : 머지 후 login 화면으로 이동
  return useMutation({
    mutationFn: signupMutationFn,
    onSuccess: () => {
      toast({ title: "회원가입이 완료되었습니다.", variant: "success" });
      //router.push("/login");
    },
    onError: (error: ApiError) => {
      toast({ title: error.message, variant: "error" });
    },
  });
}
