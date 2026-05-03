"use client";
import React, { useState } from "react";

import { TrashItemData } from "@/entities/trash";
import { useDeleteTrashMutation } from "@/features/trash/mutation/useDeleteTrashMutation";
import { useRestoreTrashMutation } from "@/features/trash/mutation/useRestoreTrashMutation";
import SoftButton from "@/shared/ui/Button/SoftButton";

import TrashItem from "../TrashItem";

interface TrashListProps {
  items: TrashItemData[];
  bottomRef: React.RefObject<HTMLDivElement | null>;
  isFetchingNextPage: boolean;
}

function TrashList({ items, bottomRef, isFetchingNextPage }: TrashListProps) {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const { mutate: restoreMutate, isPending: isRestore } =
    useRestoreTrashMutation();
  const { mutate: deleteMutate, isPending: isDeleting } =
    useDeleteTrashMutation();

  const getItemKey = (item: TrashItemData) => `${item.itemType}-${item.id}`;

  const handleToggle = (key: string) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selectedKeys.size === items.length) {
      setSelectedKeys(new Set());
    } else {
      setSelectedKeys(new Set(items.map(getItemKey)));
    }
  };

  const getSelectedTrashItems = () => {
    const selectedItems = items.filter((item) =>
      selectedKeys.has(getItemKey(item)),
    );
    return {
      goalIds: selectedItems
        .filter((item) => item.itemType === "GOAL")
        .map((item) => item.id),
      todoIds: selectedItems
        .filter((item) => item.itemType === "TODO")
        .map((item) => item.id),
    };
  };
  const handleRestore = () => {
    restoreMutate(getSelectedTrashItems(), {
      onSuccess: () => setSelectedKeys(new Set()),
    });
  };

  const handleDelete = () => {
    deleteMutate(getSelectedTrashItems(), {
      onSuccess: () => setSelectedKeys(new Set()),
    });
  };

  return (
    <div>
      <div className="bg-inverse-normal tablet:rounded-4xl tablet:h-[733px] tablet:pr-5 h-[646px] w-full overflow-y-auto rounded-3xl pt-4 pr-2 pl-5">
        {items.map((item) => (
          <TrashItem
            key={getItemKey(item)}
            isSelected={selectedKeys.has(getItemKey(item))}
            onToggle={handleToggle}
            {...item}
          />
        ))}
        <div ref={bottomRef}></div>
        {isFetchingNextPage && (
          <p className="text-caption-1 text-center text-gray-400">
            불러오는 중
          </p>
        )}
      </div>
      <div className="tablet:mt-6 mt-5 flex w-full justify-between">
        <SoftButton
          variant={"purple"}
          className="tablet:w-[108px] flex w-[90px] items-center justify-center whitespace-nowrap"
          onClick={handleSelectAll}
        >
          전체 선택
        </SoftButton>
        <div className="flex gap-2">
          <SoftButton
            variant={"grayActive"}
            className="tablet:w-[90px] w-20 whitespace-nowrap"
            onClick={handleRestore}
            disabled={selectedKeys.size === 0 || isRestore || isDeleting}
          >
            복구
          </SoftButton>
          <SoftButton
            variant={"grayActive"}
            className="tablet:w-[90px] w-20 whitespace-nowrap"
            onClick={handleDelete}
            disabled={selectedKeys.size === 0 || isRestore || isDeleting}
          >
            삭제
          </SoftButton>
        </div>
      </div>
    </div>
  );
}

export default TrashList;
