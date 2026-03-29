import { useMutation } from "@tanstack/react-query";

import { checkEmailDuplicate } from "@/features/auth/signup/api/signup.api";

export function useEmailDuplicate() {
  return useMutation({
    mutationFn: checkEmailDuplicate,
    onError: (error) => {
      console.error(JSON.stringify(error));
    },
  });
}
