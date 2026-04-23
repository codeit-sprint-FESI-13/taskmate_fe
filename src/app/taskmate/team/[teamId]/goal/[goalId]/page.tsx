import { Spacing } from "@/shared/ui/Spacing";
import { Heading, Summary } from "@/widgets/goal";
import { TodoSection } from "@/widgets/team/TodoSection";

export default function Page() {
  return (
    <div className="flex w-full flex-col justify-start px-6 py-8">
      <Heading />

      <Spacing
        size={8}
        useClassSize
        className="mobile:h-14 tablet:h-16 h-8"
      />

      <Summary />

      <Spacing
        size={8}
        useClassSize
        className="mobile:h-10 tablet:h-14 h-8"
      />

      <TodoSection />
    </div>
  );
}
