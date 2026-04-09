"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ComponentProps, useState } from "react";

import { useCreateTeamMutation } from "@/features/team/hooks/mutation/useCreateTeamMutation";
import { teamQueries } from "@/features/team/query/team.queryKey";
import { createTeamSchema } from "@/features/team/types";
import { useToast } from "@/hooks/useToast";
import type { ApiError } from "@/lib/api/types";

export const useTeamCreateForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [nameError, setNameError] = useState("");

  const createMutation = useCreateTeamMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamQueries.all().queryKey });
      toast({
        variant: "success",
        title: "팀 생성 완료",
        description: "팀이 생성되었습니다.",
      });
      router.back();
    },
    onError: (error: ApiError) => {
      toast({
        variant: "error",
        title: "팀 생성 실패",
        description: error.message ?? "잠시 후 다시 시도해주세요.",
      });
    },
  });

  const handleSubmit: ComponentProps<"form">["onSubmit"] = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const parsed = createTeamSchema.safeParse({ name });

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setNameError(fieldErrors.name?.[0] ?? "");
      return;
    }

    setNameError("");
    createMutation.mutate(parsed.data.name);
  };

  return {
    handleSubmit,
    nameError,
  };
};
