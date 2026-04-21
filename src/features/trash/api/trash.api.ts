import { apiClient } from "@/shared/utils/api/client";
import { ApiResponse } from "@/shared/utils/api/types";

import { TrashActionParam, TrashListData } from "../types/trash.types";

export async function deleteTrash(data: TrashActionParam) {
  const res = await apiClient.delete<ApiResponse<string>>("/api/trash", {
    body: data,
  });
  return res.data;
}

export async function restoreTrash(data: TrashActionParam) {
  const res = await apiClient.post<ApiResponse<string>>(
    "/api/trash/restore",
    data,
  );
  return res.data;
}

export async function getPersonalTrashList(data: {
  page?: number;
  size?: number;
}) {
  const res = await apiClient.get<ApiResponse<TrashListData>>(
    "/api/trash/personal",
    { params: data },
  );

  return res.data;
}

export async function getTeamTrashList(
  teamId: number,
  data: { page?: number; size?: number },
) {
  const res = await apiClient.get<ApiResponse<TrashListData>>(
    `/api/trash/teams/${teamId}`,
    { params: data },
  );

  return res.data;
}
