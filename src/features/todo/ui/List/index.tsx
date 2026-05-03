"use client";

import { Order } from "@/shared/ui/Order";
import { Spacing } from "@/shared/ui/Spacing";
import { cn } from "@/shared/utils/styles/cn";

import { CreateButton } from "./CreateButton";
import { Item } from "./Item";

interface ListProps {
  name: string;
  children: React.ReactNode;
  height: string;
  sortOptions: string[];
  selectedSort: string;
  onSortChange: (value: string) => void;
  footer?: React.ReactNode;
}

const ListComponent = ({
  name,
  children,
  height,
  sortOptions,
  selectedSort,
  onSortChange,
  footer,
}: ListProps) => {
  return (
    <div className="h-full w-full">
      <div className="flex w-full items-center justify-between">
        <h3 className="typography-body-1 font-bold">{name}</h3>
        <Order
          options={sortOptions}
          selected={selectedSort}
          onSelect={onSortChange}
        />
      </div>

      <Spacing size={20} />

      <div
        style={{ height }}
        className="flex w-full flex-col overflow-hidden rounded-4xl bg-white px-5 py-8"
      >
        <ul
          className={cn(
            "relative overflow-y-auto",
            footer != null ? "min-h-0 flex-1" : "w-full",
          )}
        >
          {children}
        </ul>
        {footer != null && <div className="shrink-0 px-5 pb-8">{footer}</div>}
      </div>
    </div>
  );
};

export const TodoList = {
  Item,
  CreateButton,
  List: ListComponent,
};
