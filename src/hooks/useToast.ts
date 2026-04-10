import * as React from "react";

import { ToastContext } from "@/components/common/Toast/ToastProvider";

export function useToast() {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error("useToast는 ToastProvider로 감싸야 사용 가능");
  }

  return context;
}
