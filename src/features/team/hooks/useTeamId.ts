"use client";

import { useParams } from "next/navigation";

export const useTeamId = () => {
  const { teamId } = useParams();

  if (!teamId) {
    throw new Error("Team ID is required");
  }

  return String(teamId);
};
