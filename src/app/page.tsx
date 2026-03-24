import Button from "@/components/common/Button/Button";

export default function Home() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-gray-800">Buttons</h2>
      <div className="flex items-center gap-4">
        <Button
          variant="primary"
          size="md"
        >
          Primary Button
        </Button>

        <Button
          isDisabled
          size="md"
        >
          Disabled Button
        </Button>
      </div>
    </section>
  );
}
