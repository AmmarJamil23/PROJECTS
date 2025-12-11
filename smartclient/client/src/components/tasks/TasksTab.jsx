import { useProjectTasks } from "@/features/tasks/useProjectTasks";
import TaskCard from "./TaskCard";
import CreateTaskModal from "./CreateTaskModal";

export default function TasksTab({ projectId }) {
  const { data: tasks, isLoading } = useProjectTasks(projectId);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Tasks</h2>
        <CreateTaskModal />

      </div>

      {/* List */}
      {isLoading && <p>Loading tasks...</p>}

      {!isLoading && tasks.length === 0 && (
        <p className="text-muted-foreground text-sm">
          No tasks yet. Create one!
        </p>
      )}

      {!isLoading && tasks.length > 0 && (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}
