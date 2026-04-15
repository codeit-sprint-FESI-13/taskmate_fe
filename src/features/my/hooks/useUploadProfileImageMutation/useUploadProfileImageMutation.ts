import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userQueries } from "@/constants/queryKeys";
import { uploadProfileImage } from "@/features/my/api/myInfo.api";
import { useToast } from "@/hooks/useToast";

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
