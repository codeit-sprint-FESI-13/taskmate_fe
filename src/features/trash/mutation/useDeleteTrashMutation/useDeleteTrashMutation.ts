import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteTrash, TrashActionParam } from "@/entities/trash";
import { useToast } from "@/shared/hooks/useToast";
import { ApiError } from "@/shared/lib/api/types";

export const useDeleteTrashMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: TrashActionParam) => deleteTrash(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trash"] });
      queryClient.invalidateQueries({ queryKey: ["personal", "goals"] });
      queryClient.invalidateQueries({ queryKey: ["teams", "all"] });
      queryClient.invalidateQueries({ queryKey: ["todo"] });
      toast({ title: "삭제되었습니다", variant: "success" });
    },
    onError: (error: ApiError) => {
      toast({
        title: "삭제에 실패했습니다",
        description: error.message,
        variant: "error",
      });
    },
  });
};
