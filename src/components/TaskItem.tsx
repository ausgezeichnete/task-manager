import type { Task } from "../types/task";

interface Props {
  task: Task;
  onToggle: (id: number) => void;
}

export default function TaskItem({ task, onToggle }: Props) {
  return (
    <div
      className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100
                    hover:border-indigo-200 hover:shadow-md transition-all duration-200 group"
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(task.id)}
        className={[
          "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
          task.completed
            ? "bg-indigo-600 border-indigo-600"
            : "border-gray-300 group-hover:border-indigo-400",
        ].join(" ")}
      >
        {task.completed && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </button>

      {/* Title */}
      <span
        className={[
          "flex-1 text-sm leading-relaxed transition-colors",
          task.completed ? "line-through text-gray-400" : "text-gray-700",
        ].join(" ")}
      >
        {task.title}
      </span>

      {/* Status badge */}
      <span
        className={[
          "flex-shrink-0 text-xs px-2 py-1 rounded-full font-medium",
          task.completed
            ? "bg-green-100 text-green-700"
            : "bg-amber-100 text-amber-700",
        ].join(" ")}
      >
        {task.completed ? "Done" : "Pending"}
      </span>
    </div>
  );
}
