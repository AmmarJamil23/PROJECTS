import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Pencil } from "lucide-react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTaskStore } from "./useTaskStore";
import { toast } from "sonner";

const schema = z.object({
  title: z.string().min(2),
  description: z.string().min(4),
  status: z.enum(["todo", "in-progress", "done"]),
});

export default function EditTaskModal({ task }) {
  const updateTask = useTaskStore((s) => s.updateTask);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: task.title,
      description: task.description,
      status: task.status,
    },
  });

  const onSubmit = (values) => {
    updateTask(task._id, values);
    toast.success("Task updated!");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1 text-blue-500 hover:underline">
          <Pencil size={16} /> Edit
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <Textarea {...field} rows={4} />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <select className="p-2 border rounded-md w-full" {...field}>
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full">Save Changes</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
