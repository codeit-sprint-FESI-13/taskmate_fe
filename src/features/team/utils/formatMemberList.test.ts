import { formatMemberList } from "./formatMemberList";

const makeMembers = (entries: { id: number; userId: number }[]) => entries;

describe("formatMemberList", () => {
  test("현재 사용자가 항상 첫 번째에 위치한다", () => {
    const members = makeMembers([
      { id: 3, userId: 30 },
      { id: 1, userId: 10 },
      { id: 2, userId: 20 },
    ]);

    const result = formatMemberList(members, 20);

    expect(result[0].userId).toBe(20);
  });

  test("나머지 멤버는 id 오름차순으로 정렬된다", () => {
    const members = makeMembers([
      { id: 3, userId: 30 },
      { id: 1, userId: 10 },
      { id: 2, userId: 20 },
    ]);

    const result = formatMemberList(members, 20);

    expect(result.map((m) => m.id)).toEqual([2, 1, 3]);
  });

  test("현재 사용자가 목록에 없으면 id 오름차순으로만 반환한다", () => {
    const members = makeMembers([
      { id: 3, userId: 30 },
      { id: 1, userId: 10 },
    ]);

    const result = formatMemberList(members, 99);

    expect(result.map((m) => m.id)).toEqual([1, 3]);
  });

  test("멤버가 한 명이고 본인이면 그대로 반환한다", () => {
    const members = makeMembers([{ id: 1, userId: 10 }]);

    const result = formatMemberList(members, 10);

    expect(result).toHaveLength(1);
    expect(result[0].userId).toBe(10);
  });
});
