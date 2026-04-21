import { apiClient } from "@/shared/utils/api/client";

import { ProgressSuccessResponse } from "./types";

export const progressApi = {
  read: () => apiClient.get<ProgressSuccessResponse>("/api/main/progress"),
};
