import { Dropdown } from "../hooks/useDropdown/Dropdown";

export default function Home() {
  return (
    <Dropdown
      options={["todo", "doing", "done"]}
      selected="todo"
      className="w-40"
    />
  );
}
