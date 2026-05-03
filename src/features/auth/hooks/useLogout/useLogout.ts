"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { logoutAction } from "@/features/auth/logout/actions/logoutAction";
import { useToast } from "@/shared/hooks/useToast";

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();

  const logout = async () => {
    try {
      queryClient.clear();
      await logoutAction();
      router.push("/login");
    } catch {
      toast({ title: "로그아웃에 실패했어요.", variant: "error" });
    }
  };

  return { logout };
}
