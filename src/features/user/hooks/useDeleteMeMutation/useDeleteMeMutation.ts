import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { deleteMe } from "@/entities/auth/api/myInfo.api";
import { logoutAction } from "@/features/auth/logout/actions/logoutAction";
import { useToast } from "@/shared/hooks/useToast";

export function useDeleteMeMutation() {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: deleteMe,
    onSuccess: async () => {
      await logoutAction();
      router.push("/login");
    },
    onError: () => {
      toast({ title: "회원 탈퇴에 실패했습니다.", variant: "error" });
    },
  });
}
