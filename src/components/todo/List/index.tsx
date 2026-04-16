"use client";

import { Spacing } from "@/components/common/Spacing";

import { CreateButton } from "./CreateButton";
import { Item } from "./Item";
import { Order } from "./Order";

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

      {footer != null ? (
        <div
          style={{ height }}
          className="flex w-full flex-col overflow-hidden rounded-4xl bg-white px-5 py-8"
        >
          <ul className="relative min-h-0 flex-1 overflow-y-auto">
            {children}
          </ul>
          <div className="shrink-0 px-5 pb-8">{footer}</div>
        </div>
      ) : (
        <div
          style={{ height }}
          className="flex w-full flex-col overflow-hidden rounded-4xl bg-white px-5 py-8"
        >
          <ul className="relative w-full overflow-y-scroll">{children}</ul>
        </div>
      )}
    </div>
  );
};

export const TodoList = {
  Item,
  CreateButton,
  List: ListComponent,
};
