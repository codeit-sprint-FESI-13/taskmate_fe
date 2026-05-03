import { Spacing } from "@/shared/ui/Spacing";
import { Heading, Summary } from "@/widgets/goal";
import { TodoSection } from "@/widgets/todo/TodoSection";

export default function Page() {
  return (
    <div className="flex w-full flex-col justify-start px-6 py-8">
      <Heading />

      <Spacing size={64} />

      <Summary />

      <Spacing size={56} />

      <TodoSection />
    </div>
  );
}
