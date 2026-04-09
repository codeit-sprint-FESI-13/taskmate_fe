import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userQueries } from "@/constants/queryKeys";
import { useToast } from "@/hooks/useToast";

import { uploadProfileImage } from "../api/myInfo.api";

export function useUploadProfileImageMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries(userQueries.myInfo());
    },
    onError: () => {
      toast({ title: "이미지 업로드에 실패했습니다.", variant: "error" });
    },
  });
}
