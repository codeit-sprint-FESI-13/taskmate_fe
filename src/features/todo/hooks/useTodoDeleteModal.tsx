"use client";

import { useDeleteTodoMutation } from "@/features/todo/mutation/useDeleteTodoMutation";
import { TodoDeleteModal } from "@/features/todo/ui/TodoDeleteModal/TodoDeleteModal";
import { useGoalId } from "@/shared/hooks/useGoalId";
import { useOverlay } from "@/shared/hooks/useOverlay";

const TODO_DELETE_MODAL_ID = "todo-delete-confirm-modal";

export const useTodoDeleteModal = ({ todoId }: { todoId: string }) => {
  const overlay = useOverlay();
  const goalId = useGoalId();

  const closeTodoDeleteModal = () => {
    overlay.close();
  };

  const { mutate: deleteTodo } = useDeleteTodoMutation({
    onSuccess: closeTodoDeleteModal,
  });

  const openTodoDeleteModal = () => {
    overlay.open(
      TODO_DELETE_MODAL_ID,
      <TodoDeleteModal
        onClose={closeTodoDeleteModal}
        onConfirm={() => deleteTodo({ goalId, todoId })}
      />,
    );
  };

  return {
    openTodoDeleteModal,
    closeTodoDeleteModal,
  };
};
