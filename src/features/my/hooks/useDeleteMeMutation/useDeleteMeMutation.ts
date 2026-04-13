import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { logoutAction } from "@/features/auth/logout/actions/logoutAction";
import { useToast } from "@/hooks/useToast";

import { deleteMe } from "../../api/myInfo.api";

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
