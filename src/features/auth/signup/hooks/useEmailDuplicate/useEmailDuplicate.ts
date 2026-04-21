import { useMutation } from "@tanstack/react-query";

import { checkEmailDuplicate } from "@/entities/auth/api/signup.api";

export function useEmailDuplicate() {
  return useMutation({
    mutationFn: checkEmailDuplicate,
  });
}
