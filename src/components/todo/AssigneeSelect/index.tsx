"use client";

import { Icon } from "@/components/common/Icon";
import { Member } from "@/features/team/types";
import { useDropdown } from "@/hooks/useDropdown";
import { cn } from "@/utils/utils";

interface AssigneeSelectProps {
  members: Member[];
  value: string[];
  onChange: (memberIds: string[]) => void;
  placeholder?: string;
}

export function AssigneeSelect({
  members,
  value,
  onChange,
  placeholder = "담당자를 선택해주세요",
}: AssigneeSelectProps) {
  const { isOpen, toggle, containerRef } = useDropdown(
    members.map((member) => String(member.userId)),
  );

  const selectedMembers = () => {
    const byId = new Map(members.map((member) => [member.userId, member]));
    return value.map((id) => byId.get(Number(id))).filter(Boolean) as Member[];
  };

  const toggleMember = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((x) => x !== id));
    } else {
      onChange([...value, id]);
    }
  };

  const removeMember = (userId: number) => {
    onChange(value.filter((x) => x !== String(userId)));
  };

  return (
    <div
      ref={containerRef}
      className={"relative w-full"}
    >
      <div
        onClick={toggle}
        className="text-label-normal flex min-h-11 w-full cursor-pointer items-center gap-2 rounded-xl border border-gray-300 bg-white py-3 pr-3 pl-4 text-sm leading-5 font-medium"
      >
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          {selectedMembers().length === 0 ? (
            <span className="text-label-alternative">{placeholder}</span>
          ) : (
            selectedMembers().map((member) => (
              <span
                key={member.userId}
                className="flex items-center gap-1"
              >
                {/* @TODO: Member Profile Image or Default Profile Image */}
                {/* @TODO: Profile Image 응답값 수정 이후 작업 필요 */}

                <span className="typography-label-1 text-label-normal max-w-[140px] truncate font-semibold">
                  {member.userNickname}
                </span>

                <button
                  type="button"
                  className={`flex shrink-0 cursor-pointer items-center p-0.5 text-gray-400 hover:text-gray-600`}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeMember(member.userId);
                  }}
                >
                  <Icon
                    name="FilledXCircle"
                    size={24}
                  />
                </button>
              </span>
            ))
          )}
        </div>

        <Icon
          name="DownFilledArrow"
          size={24}
          className={cn(
            "mt-0.5 shrink-0 self-start text-gray-500 transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </div>

      {isOpen && (
        <ul className="absolute right-0 left-0 z-20 mt-1 max-h-52 overflow-y-auto rounded-2xl border border-gray-200 bg-white py-1 shadow-lg">
          {members.map((member) => (
            <li key={member.userId}>
              <button
                type="button"
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-blue-800 hover:text-white"
                onClick={() => toggleMember(String(member.userId))}
              >
                {/* @TODO: Member Profile Image or Default Profile Image */}

                <span className="typography-body-2 font-medium wrap-break-word">
                  {member.userNickname}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
