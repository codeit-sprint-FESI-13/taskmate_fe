import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { signupMutationFn } from "@/entities/auth/api/req/signup.api";
import { useToast } from "@/hooks/useToast";
import { ApiError } from "@/shared/utils/api/types";

export function useSignupMutation() {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: signupMutationFn,
    onSuccess: () => {
      toast({ title: "회원가입이 완료되었습니다.", variant: "success" });
      router.push("/login");
    },
    onError: (error: ApiError) => {
      toast({ title: error.message, variant: "error" });
    },
  });
}
