import { useTodoCreateModal } from "@/features/todo/hooks/useTodoCreateModal";
import Button from "@/shared/ui/Button/Button/Button";
import { Icon } from "@/shared/ui/Icon";

export const CreateButton = () => {
  const { openTodoCreateModal } = useTodoCreateModal();

  return (
    <div className="flex w-full items-center justify-end">
      <Button
        variant="primary"
        size="lg"
        onClick={openTodoCreateModal}
        leftIcon={
          <Icon
            name="Plus"
            size={24}
            className="text-white"
          />
        }
      >
        <span className="typography-body-2 font-semibold text-white">
          할 일 추가
        </span>
      </Button>
    </div>
  );
};
