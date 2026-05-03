"use client";

import { useParams } from "next/navigation";

export const useGoalId = () => {
  const { goalId } = useParams();

  if (!goalId) {
    throw new Error("Goal ID is required");
  }

  return String(goalId);
};
