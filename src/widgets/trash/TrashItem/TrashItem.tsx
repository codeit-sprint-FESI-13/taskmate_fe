import React from "react";

import { TrashItemData } from "@/entities/trash";
import { Icon } from "@/shared/ui/Icon";
import TrashBadge from "@/widgets/trash/TrashItem/TrashBadge";

interface TrashItemProps extends TrashItemData {
  isSelected: boolean;
  onToggle: (key: string) => void;
}

function TrashItem({ isSelected, onToggle, ...item }: TrashItemProps) {
  return (
    <div className="bg-background-normal flex items-center gap-4 rounded-2xl px-2.5 py-2">
      <div className="flex">
        <Icon
          name={isSelected ? "ActiveFilledCheckBox" : "InactiveFilledCheckBox"}
          className="tablet:size-6 size-5 cursor-pointer"
          onClick={() => onToggle(`${item.itemType}-${item.id}`)}
        />
      </div>
      <div className="flex min-w-0 flex-col">
        {item.itemType === "GOAL" ? (
          <div className="flex min-w-0 items-center gap-2">
            <TrashBadge type={"goal"} />
            <span className="text-label-1 truncate font-semibold text-slate-800">
              {item.goalName}
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <TrashBadge type={"todo"} />
              <span className="text-label-1 truncate font-semibold text-slate-800">
                {item.todoTitle}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Icon
                name="Paper"
                className="size-3 text-gray-300"
              />
              <span className="text-label-2 font-medium text-gray-500">
                {item.goalName}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrashItem;
