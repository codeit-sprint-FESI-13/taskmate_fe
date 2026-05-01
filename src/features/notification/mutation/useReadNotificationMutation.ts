import { useMutation, useQueryClient } from "@tanstack/react-query";

import { NotificationApi } from "@/entities/notification";

type UseReadNotificationMutationOptions = {
  onSuccess?: () => void;
};

export function useReadNotificationMutation({
  onSuccess,
}: UseReadNotificationMutationOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => NotificationApi.read(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      onSuccess?.();
    },
  });
}
