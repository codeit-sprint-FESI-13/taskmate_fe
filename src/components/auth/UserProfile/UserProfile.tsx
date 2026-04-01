import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

import ProfileCard from "@/components/common/ProfileCard/ProfileCard";
import { userQueries } from "@/constants/queryKeys";

const UserProfile = () => {
  const { data } = useSuspenseQuery(userQueries.myInfo());
  return (
    <ProfileCard
      variant="gnb"
      avatar={data.profileImageUrl ?? ""}
      nickName={data.nickname}
      email={data.email}
    />
  );
};

export default UserProfile;
