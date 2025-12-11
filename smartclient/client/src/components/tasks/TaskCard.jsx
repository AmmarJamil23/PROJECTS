import { Badge } from "@/components/ui/badge";
import { Pencil, Trash } from "lucide-react";
import EditTaskModal from "./EditTaskModal";
import { useTaskStore } from "./useTaskStore";
import { toast } from "sonner";

export default function TaskCard({ task }) {
  const deleteTask = useTaskStore((s) => s.deleteTask);

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-card">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{task.title}</h3>
          <p className="text-muted-foreground text-sm mt-1">{task.description}</p>
        </div>

        <Badge
          variant={task.status === "done" ? "success" : "default"}
          className="capitalize"
        >
          {task.status}
        </Badge>
      </div>

      <div className="flex gap-3 mt-4 text-sm">
        <EditTaskModal task={task} />

        <button
          onClick={() => {
            deleteTask(task._id);
            toast.success("Task deleted");
          }}
          className="text-red-500 hover:underline flex items-center gap-1"
        >
          <Trash size={16} />
          Delete
        </button>
      </div>
    </div>
  );
}
