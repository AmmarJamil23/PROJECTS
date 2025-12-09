import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function AddTaskButton() {
  return (
    <Button className="flex items-center gap-2">
      <Plus size={18} />
      Add Task
    </Button>
  );
}
