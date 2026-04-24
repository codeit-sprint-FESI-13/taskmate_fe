import GoalListError from "./Error";
import GoalListComponent from "./GoalList";
import GoalListLoading from "./Loading";

export const GoalList = Object.assign(GoalListComponent, {
  Error: GoalListError,
  Loading: GoalListLoading,
});
