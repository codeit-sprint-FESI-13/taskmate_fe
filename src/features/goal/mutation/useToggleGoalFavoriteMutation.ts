import { useMutation, useQueryClient } from "@tanstack/react-query";

import { goalApi } from "@/entities/goal";

export function useToggleGoalFavoriteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (goalId: number) => goalApi.toggleFavorite(goalId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoriteGoals"] });
    },
  });
}
