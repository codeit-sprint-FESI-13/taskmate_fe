import { useMutation, useQueryClient } from "@tanstack/react-query";

import { NotificationApi } from "@/entities/notification";

type UseReadAllNotificationMutationOptions = {
  onSuccess?: () => void;
};

export function useReadAllNotificationMutation({
  onSuccess,
}: UseReadAllNotificationMutationOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => NotificationApi.readAll(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      onSuccess?.();
    },
  });
}
