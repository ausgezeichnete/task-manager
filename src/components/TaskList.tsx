import TaskItem from './TaskItem';
import type { Task } from '../types/task';

interface Props {
  tasks: Task[];
  onToggle: (id: number) => void;
}

export default function TaskList({ tasks, onToggle }: Props) {
  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-400 py-12">
        No tasks found for this filter.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}