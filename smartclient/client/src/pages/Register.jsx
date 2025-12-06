import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthLayout from "@/layouts/AuthLayout";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormItem, FormLabel, FormField, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

const registerSchema = z.object({
  name: z.string().min(2, "Too short"),
  email: z.string().email(),
  password: z.string().min(6),
});

export default function Register() {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (values) => {
    try {
      await api.post("/auth/register", values);
      toast.success("Account created! You can now login.");
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <Input {...field} placeholder="Ammar Jamil" />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input type="email" {...field} placeholder="you@example.com" />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <Input type="password" {...field} placeholder="******" />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">Register</Button>
        </form>
      </Form>
    </AuthLayout>
  );
}
