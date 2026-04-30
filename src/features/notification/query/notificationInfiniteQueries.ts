import { NotificationApi } from "@/entities/notification";
import { createPaginationOptions } from "@/shared/utils/createPaginationOptions";

export const notificationInfiniteQueries = {
  notificationsInfinite: () =>
    createPaginationOptions("notifications", NotificationApi.get),
};
