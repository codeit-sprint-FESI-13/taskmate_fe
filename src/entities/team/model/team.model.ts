import z from "zod";

import { TEAM_NAME_MAX_LENGTH } from "../types/team.types";

export const createTeamSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "팀 이름을 입력해주세요.")
    .max(
      TEAM_NAME_MAX_LENGTH,
      `팀 이름은 ${TEAM_NAME_MAX_LENGTH}자 이내로 입력해주세요.`,
    ),
});

export type CreateTeamInput = z.infer<typeof createTeamSchema>;
