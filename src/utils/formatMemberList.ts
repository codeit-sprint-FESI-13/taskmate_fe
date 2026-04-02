type HasIds = {
  id: number;
  userId: number;
};

export function formatMemberList<T extends HasIds>(
  members: T[],
  userId: number,
): T[] {
  const currentUser = members.find((member) => member.userId === userId);
  const otherMembers = members
    .filter((member) => member.userId !== userId)
    .sort((a, b) => a.id - b.id);

  return currentUser ? [currentUser, ...otherMembers] : otherMembers;
}
