import { GoalInfo as GoalInfoComponent } from "./GoalInfo";
import GoalInfoError from "./GoalInfoError";
import GoalInfoLoading from "./GoalInfoLoading";

export const GoalInfo = Object.assign(GoalInfoComponent, {
  Loading: GoalInfoLoading,
  Error: GoalInfoError,
});
