import { Icon } from "@/components/common/Icon";
import { useTodoDeleteModal } from "@/features/todo/hooks/useTodoDeleteModal";
import { useTodoDetailModal } from "@/features/todo/hooks/useTodoDetailModal";
import { Todo } from "@/features/todo/types";

import { TodoItem } from "../TodoItem";

interface ItemProps {
  todo: Todo;
}

export const Item = ({ todo }: ItemProps) => {
  const { openTodoDeleteModal } = useTodoDeleteModal();
  const { openTodoDetailModal } = useTodoDetailModal();

  return (
    <li
      className="flex w-full items-center justify-between px-3 py-[10px]"
      onClick={openTodoDetailModal}
    >
      <div className="flex items-center justify-start gap-2">
        {/* @TODO: 드롭다운 UI 추가 필요 */}
        <TodoItem.Name>{todo.title}</TodoItem.Name>
        <TodoItem.Day color="gray">D-5</TodoItem.Day>
      </div>
      <div>
        <div className="flex items-center">
          {/* @TODO: 담당자 이미지 받아서 처리 */}
          {todo.assignees.map((assignee, index) => (
            <span
              key={assignee.userId}
              className="relative -ml-[14px] shrink-0 first:ml-0"
              style={{ zIndex: index + 1 }}
            >
              {/* @TODO: User Profile Image List 이후 이미지 받아서 처리 */}
              {assignee.nickname}
            </span>
          ))}
        </div>

        <button
          type="button"
          className="shrink-0 cursor-pointer"
          onClick={openTodoDeleteModal}
        >
          <Icon
            name="Trash"
            size={24}
            className="text-gray-300"
          />
        </button>
      </div>
    </li>
  );
};
