import { GoalProgress as GoalProgressComponent } from "./GoalProgress";
import GoalProgressError from "./GoalProgressError";
import GoalProgressLoading from "./GoalProgressLoading";

export const GoalProgress = Object.assign(GoalProgressComponent, {
  Loading: GoalProgressLoading,
  Error: GoalProgressError,
});
