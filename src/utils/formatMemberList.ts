type Member = {
  userId: number;
};

export function formatMemberList(members: Member[], userId: number): Member[] {
  const currentUser = members.find((member) => member.userId === userId);
  const otherMembers = members.filter((member) => member.userId !== userId);

  return currentUser ? [currentUser, ...otherMembers] : otherMembers;
}
