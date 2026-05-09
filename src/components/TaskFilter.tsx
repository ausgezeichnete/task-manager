import type { FilterStatus } from "../types/task";

interface Props {
  filter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}

const options: { value: FilterStatus; label: string }[] = [
  { value: "all", label: "All Tasks" },
  { value: "completed", label: "✓ Completed" },
  { value: "incompleted", label: "○ Pending" },
];

export default function TaskFilter({ filter, onFilterChange }: Props) {
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onFilterChange(option.value)}
          className={[
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            filter === option.value
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-300",
          ].join(" ")}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
