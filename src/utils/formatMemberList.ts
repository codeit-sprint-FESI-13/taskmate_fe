type Member = {
  id: number;
  userId: number;
};

export function formatMemberList(members: Member[], userId: number): Member[] {
  const currentUser = members.find((member) => member.userId === userId);
  const otherMembers = members
    .filter((member) => member.userId !== userId)
    .sort((a, b) => a.id - b.id);

  return currentUser ? [currentUser, ...otherMembers] : otherMembers;
}
