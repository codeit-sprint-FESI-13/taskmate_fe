"use client";

import { useParams } from "next/navigation";

export function useOptionalTeamId(): string | null {
  const { teamId } = useParams();
  return teamId != null ? String(teamId) : null;
}
