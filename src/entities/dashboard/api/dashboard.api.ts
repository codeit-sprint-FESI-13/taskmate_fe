import { apiClient } from "@/shared/lib/api/client";

import { ProgressSuccessResponse } from "../types/dashboard.types";

export const progressApi = {
  read: () => apiClient.get<ProgressSuccessResponse>("/api/main/progress"),
};
