import { NotificationApi } from "../api";
import { createPaginationOptions } from "../utils";

export const notificationInfiniteQueries = {
  notificationsInfinite: () =>
    createPaginationOptions("notifications", NotificationApi.get),
};
