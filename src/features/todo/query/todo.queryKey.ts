import { queryOptions } from "@tanstack/react-query";

import { STALE_TIME } from "@/constants/staleTime";

import { todoApi } from "../api";

export const todoQueries = {
  getTodoList: (goalId: string) =>
    queryOptions({
      queryKey: ["todo", goalId, "list"],
      queryFn: async () => {
        const response = await todoApi.getList(goalId);
        return response.data;
      },
      staleTime: STALE_TIME.DEFAULT,
    }),
};
