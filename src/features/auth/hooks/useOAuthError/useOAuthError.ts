import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { useToast } from "@/hooks/useToast";

export function useOAuthError(authType: "login" | "signup") {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    // TODO : 모달로 변경예정
    const error = searchParams.get("error");
    const authTypeTitle = authType === "login" ? "로그인" : "회원가입";
    if (error) {
      toast({
        title: `Google ${authTypeTitle}에 실패했어요. 다시 시도해주세요.`,
        variant: "error",
      });

      router.replace(pathname);
    }
  }, [searchParams, authType, pathname, router, toast]);
}
