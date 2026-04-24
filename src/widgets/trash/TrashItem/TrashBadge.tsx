import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const trashBadgeVariants = cva(
  "flex items-center justify-center rounded-lg py-1 px-2.5 w-fit text-label-2 font-semibold shrink-0",
  {
    variants: {
      type: {
        todo: "bg-blue-100 text-blue-700",
        goal: "bg-green-200 text-green-800",
      },
    },
  },
);

type TrashBadgeProps = VariantProps<typeof trashBadgeVariants>;

function TrashBadge({ type }: TrashBadgeProps) {
  return (
    <div className={trashBadgeVariants({ type })}>
      {type === "todo" ? "할 일" : "목표"}
    </div>
  );
}

export default TrashBadge;
