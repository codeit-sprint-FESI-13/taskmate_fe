"use client";
import React, { useState } from "react";

import { useDeleteTrashMutation } from "@/features/trash/hooks/useDeleteTrashMutation";
import { useRestoreTrashMutation } from "@/features/trash/hooks/useRestoreTrashMutation";
import { TrashItemData } from "@/features/trash/types/trash.types";
import SoftButton from "@/shared/ui/Button/SoftButton";

import TrashItem from "../TrashItem";

interface TrashListProps {
  items: TrashItemData[];
  bottomRef: React.RefObject<HTMLDivElement | null>;
  isFetchingNextPage: boolean;
}

function TrashList({ items, bottomRef, isFetchingNextPage }: TrashListProps) {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const { mutate: restoreMutate, isPending: isRestore } =
    useRestoreTrashMutation();
  const { mutate: deleteMutate, isPending: isDeleting } =
    useDeleteTrashMutation();

  const handleToggle = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selectedIds.size === items.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(items.map((item) => item.id)));
    }
  };

  const getSelectedTrashItems = () => {
    const selectedItems = items.filter((item) => selectedIds.has(item.id));
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
      onSuccess: () => setSelectedIds(new Set()),
    });
  };

  const handleDelete = () => {
    deleteMutate(getSelectedTrashItems(), {
      onSuccess: () => setSelectedIds(new Set()),
    });
  };

  return (
    <div>
      <div className="bg-inverse-normal tablet:rounded-4xl tablet:h-[733px] tablet:pr-5 h-[646px] w-full overflow-y-auto rounded-3xl pt-4 pr-2 pl-5">
        {items.map((item) => (
          <TrashItem
            key={item.id}
            isSelected={selectedIds.has(item.id)}
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
            disabled={selectedIds.size === 0 || isRestore || isDeleting}
          >
            복구
          </SoftButton>
          <SoftButton
            variant={"grayActive"}
            className="tablet:w-[90px] w-20 whitespace-nowrap"
            onClick={handleDelete}
            disabled={selectedIds.size === 0 || isRestore || isDeleting}
          >
            삭제
          </SoftButton>
        </div>
      </div>
    </div>
  );
}

export default TrashList;
