import MemberListError from "./Error";
import MemberListLoading from "./Loading";
import MemberListComponent from "./MemberList";

export const MemberList = Object.assign(MemberListComponent, {
  Error: MemberListError,
  Loading: MemberListLoading,
});
