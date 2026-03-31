import { useRouter } from "next/navigation";

import { Icon } from "@/components/common/Icon";

interface HeaderProps {
  children: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <div className="relative flex h-[40px] items-center justify-start px-4">
      {children}
    </div>
  );
};

interface TitleProps {
  children: React.ReactNode;
}

const Title = ({ children }: TitleProps) => {
  return (
    <h4 className="typography-body-2 font-semibold text-gray-400">
      {children}
    </h4>
  );
};

const TeamAddIcon = () => {
  return (
    <Icon
      name="Plus"
      size={24}
      className="absolute right-4 text-gray-400"
    />
  );
};

interface GoalCreateButtonProps {
  teamId?: number;
}

const GoalCreateButton = ({ teamId }: GoalCreateButtonProps) => {
  const router = useRouter();

  return (
    <button
      type="button"
      className="flex w-full cursor-pointer items-center justify-start gap-2 rounded-2xl border border-gray-200 px-7 py-3 shadow-[0_0_14px_0_rgba(138,138,138,0.08)]"
      onClick={() => {
        if (teamId) {
          router.push(`/taskmate/team/${teamId}/goal/create`);
        } else {
          router.push("/taskmate/personal/goal/create");
        }
      }}
    >
      <Icon
        name="Plus"
        size={24}
        className="text-gray-200"
      />
      <span className="text-label-1 font-semibold text-gray-500">
        새 목표 추가
      </span>
    </button>
  );
};

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <div className="flex flex-col">{children}</div>;
};

export const List = {
  Container,
  Header,
  Title,
  GoalCreateButton,
  TeamAddIcon,
};
