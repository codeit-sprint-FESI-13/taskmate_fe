import { TodoItem } from "@/entities/todo/types/types";
import { formatDDay } from "@/features/todo/utils/formatDDay";

type Props = TodoItem;

const MainTodoItem = ({
  title,
  teamDisplayName,
  goalTitle,
  dueDate,
}: Props) => {
  return (
    <div className="bg-background-normal tablet:rounded-3xl tablet:px-8 tablet:py-6 flex flex-col gap-2 rounded-[20px] p-3.5">
      <div className="tablet:gap-2 flex items-center gap-1.5">
        <span className="typography-label-1 tablet:typography-body-1 font-semibold">
          {title}
        </span>
        <span className="bg-red-light typography-label-2 text-red-normal rounded-lg px-2.5 py-1 font-semibold">
          {formatDDay(dueDate)}
        </span>
      </div>
      <div className="tablet:gap-2 flex items-center gap-1.5">
        <span className="typography-label-2 rounded-lg bg-gray-100 px-2.5 py-1 font-semibold text-gray-400">
          {teamDisplayName}
        </span>
        <span className="table:typography-body-2 typography-label-2 text-gray-500">
          {goalTitle}
        </span>
      </div>
    </div>
  );
};

export default MainTodoItem;
