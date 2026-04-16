import { useMutation, useQueryClient } from "@tanstack/react-query";

import { restoreTrash } from "@/features/trash/api/trash.api";
import { TrashActionParam } from "@/features/trash/types/trash.types";
import { useToast } from "@/hooks/useToast";
import { ApiError } from "@/lib/api/types";

export const useRestoreTrashMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: TrashActionParam) => restoreTrash(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trash"] });
      queryClient.invalidateQueries({ queryKey: ["personal", "goals"] });
      queryClient.invalidateQueries({ queryKey: ["teams", "all"] });
      queryClient.invalidateQueries({ queryKey: ["todo"] });

      toast({ title: "복구되었습니다", variant: "success" });
    },
    onError: (error: ApiError) => {
      toast({
        title: "복구에 실패했습니다",
        description: error.message,
        variant: "error",
      });
    },
  });
};
