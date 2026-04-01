"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { userQueries } from "@/constants/queryKeys/user.queryKey";

const UserInitializer = () => {
  useSuspenseQuery(userQueries.myInfo());
  return null;
};

export default UserInitializer;
