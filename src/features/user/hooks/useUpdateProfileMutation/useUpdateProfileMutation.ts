import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProfile } from "@/entities/auth/api/myInfo.api";
import { userQueries } from "@/entities/auth/query/user.queryKey";
import { useToast } from "@/shared/hooks/useToast";
import { ApiError } from "@/shared/lib/api/types";

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(userQueries.myInfo());
      toast({ title: "프로필이 저장되었습니다.", variant: "success" });
    },
    onError: (error: ApiError) => {
      toast({ title: error.message, variant: "error" });
    },
  });
}
