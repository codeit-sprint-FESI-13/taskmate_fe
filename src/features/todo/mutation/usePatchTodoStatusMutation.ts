"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Todo, TodoStatus, UpdateTodoRequest } from "@/entities/todo";
import { todoApi } from "@/entities/todo";

type PatchTodoStatusVariables = {
  goalId: string;
  todoId: string;
  todoData: UpdateTodoRequest;
};

export const usePatchTodoStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ goalId, todoId, todoData }: PatchTodoStatusVariables) =>
      todoApi.patch(goalId, todoId, todoData),
    throwOnError: false,

    onMutate: async ({
      goalId,
      todoId,
      todoData,
    }: PatchTodoStatusVariables) => {
      const queryKey = ["todo", goalId, "list"] as const;
      await queryClient.cancelQueries({ queryKey });

      const previousTodos = queryClient.getQueryData<Todo[]>(queryKey);

      queryClient.setQueryData<Todo[]>(queryKey, (old) => {
        const todos = old ?? [];
        return todos.map((todo) => {
          if (String(todo.id) !== todoId) return todo;
          return {
            ...todo,
            title: todoData.title,
            startDate: todoData.startDate,
            dueDate: todoData.dueDate,
            status: todoData.status as TodoStatus,
            memo: todoData.memo,
          };
        });
      });

      return { previousTodos };
    },

    onError: (_error, variables, context) => {
      if (!context?.previousTodos) return;
      queryClient.setQueryData(
        ["todo", variables.goalId, "list"],
        context.previousTodos,
      );
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["todo", variables.goalId, "list"],
      });
    },
  });
};
