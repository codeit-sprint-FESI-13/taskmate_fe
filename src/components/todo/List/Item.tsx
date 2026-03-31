import { Icon } from "@/components/common/Icon";
import { useTodoDeleteModal } from "@/features/todo/hooks/useTodoDeleteModal";
import { useTodoDetailModal } from "@/features/todo/hooks/useTodoDetailModal";

import { TodoItem } from "../TodoItem";

export const Item = () => {
  const { openTodoDeleteModal } = useTodoDeleteModal();
  const { openTodoDetailModal } = useTodoDetailModal();

  return (
    <li
      className="flex w-full items-center justify-between px-3 py-[10px]"
      onClick={openTodoDetailModal}
    >
      <div className="flex items-center justify-start gap-2">
        {/* @TODO: 드롭다운 UI 추가 필요 */}
        <TodoItem.Name>Name 컴포넌트 테스트</TodoItem.Name>
        <TodoItem.Day color="gray">D-5</TodoItem.Day>
      </div>
      <div>
        {/* @TODO: User Profile Image List 이후 이미지 받아서 처리 */}
        {/* <div className="flex items-center">
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className="relative -ml-[14px] shrink-0 first:ml-0"
                  style={{ zIndex: i + 1 }}
                >
                  <Icon
                    name="FlagBlue"
                    size={32}
                    className="text-gray-300"
                  />
                </span>
              ))}
            </div> */}

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
