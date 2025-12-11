import { useTaskStore } from "@/components/tasks/useTaskStore";
export function useProjectTasks() {
  const tasks = useTaskStore((state) => state.tasks);

  return {
    data: tasks,
    isLoading: false,
  };
}
