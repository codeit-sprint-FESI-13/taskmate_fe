import Button from "@/components/common/Button/Button";
import { Icon } from "@/components/common/Icon";

export const CreateButton = () => {
  return (
    <div className="absolute right-5 bottom-8 flex w-full items-center justify-end">
      <Button
        variant="primary"
        size="lg"
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
