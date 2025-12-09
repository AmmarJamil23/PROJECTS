import { Badge } from "@/components/ui/badge";

export default function TaskCard({ task }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-card">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">{task.title}</h3>
        <Badge
          variant={task.status === "done" ? "success" : "default"}
          className="capitalize"
        >
          {task.status}
        </Badge>
      </div>

      <p className="text-muted-foreground text-sm mt-2">
        {task.description}
      </p>
    </div>
  );
}
