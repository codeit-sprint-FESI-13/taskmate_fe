"use client";

import { useNotificationSSE } from "./useNotificationSSE";

export default function NotificationSubscriber() {
  useNotificationSSE();
  return null;
}
