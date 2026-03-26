import { Icon } from "../common/Icon";

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

// @TODO: Button 공통 컴포넌트 반영후 수정
const GoalCreateButton = () => {
  return (
    <button
      type="button"
      className="flex items-center justify-start gap-[10px]"
    >
      <Icon
        name="Plus"
        size={24}
        className="text-gray-300"
      />
      새 목표 추가
    </button>
  );
};

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  /* ul은 li만 직계 자식으로 둘 수 있어 Spacing·버튼 등과 함께 쓰면 DOM이 깨질 수 있음 */
  return <div className="flex flex-col">{children}</div>;
};

export const List = {
  Container,
  Header,
  Title,
  GoalCreateButton,
  TeamAddIcon,
};
