import { queryOptions } from "@tanstack/react-query";

import { STALE_TIME } from "@/constants/staleTime";

import { todoApi } from "../api";
import type { TodoListQueryParams } from "../types";

const defaultParams: TodoListQueryParams = {
  sort: "DUE_DATE",
  mineOnly: false,
  titleContains: "",
};

export const todoQueries = {
  getTodoList: (goalId: string, params: TodoListQueryParams = defaultParams) =>
    queryOptions({
      queryKey: ["todo", goalId, "list", "TODO", params],
      queryFn: async () => {
        const response = await todoApi.getTodoList(goalId, params);
        return response.data;
      },
      staleTime: STALE_TIME.DEFAULT,
    }),

  getDoingList: (goalId: string, params: TodoListQueryParams = defaultParams) =>
    queryOptions({
      queryKey: ["todo", goalId, "list", "DOING", params],
      queryFn: async () => {
        const response = await todoApi.getDoingList(goalId, params);
        return response.data;
      },
      staleTime: STALE_TIME.DEFAULT,
    }),

  getDoneList: (goalId: string, params: TodoListQueryParams = defaultParams) =>
    queryOptions({
      queryKey: ["todo", goalId, "list", "DONE", params],
      queryFn: async () => {
        const response = await todoApi.getDoneList(goalId, params);
        return response.data;
      },
      staleTime: STALE_TIME.DEFAULT,
    }),
};
