import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMemberStore } from "@/features/members/useMemberStore";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.enum(["member", "viewer"]),
});

export default function AddMemberModal() {
  const addMember = useMemberStore((s) => s.addMember);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      role: "member",
    },
  });

  const onSubmit = (values) => {
    addMember(values);
    toast.success("Member added!");
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Member</Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <Input {...field} placeholder="Full name" />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input {...field} placeholder="example@gmail.com" />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Role */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <select
                    {...field}
                    className="border rounded-md p-2 w-full bg-background"
                  >
                    <option value="member">Member</option>
                    <option value="viewer">Viewer</option>
                  </select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              Add Member
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
