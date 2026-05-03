import { useMutation, useQueryClient } from "@tanstack/react-query";

import { uploadProfileImage } from "@/entities/auth/api/myInfo.api";
import { userQueries } from "@/entities/auth/query/user.queryKey";
import { useToast } from "@/shared/hooks/useToast";

export function useUploadProfileImageMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: () => {
      toast({ title: "이미지 업로드에 성공했습니다.", variant: "success" });
      queryClient.invalidateQueries(userQueries.myInfo());
    },
    onError: () => {
      toast({ title: "이미지 업로드에 실패했습니다.", variant: "error" });
    },
  });
}
