import React from 'react'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import AuthLayout from "../layouts/AuthLayout";
import { api } from "../lib/api";
import { useAuthStore } from '../features/auth/useAuthStore';
import { toast } from "sonner";


const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "At least 6 characters"),

});

const Login = () => {
    const setAuth = useAuthStore((s) => s.setAuth);

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: ""},
    });

const onSubmit = async (values) => {
    try {
        const res = await api.post("/auth/login", values);
        setAuth({ user: res.data.user, token: res.data.token });

        localStorage.setItem("token", res.data.token);

        toast.success("Login successful")

    } catch (err) {
        toast.error(err.response?.data?.error || "Login Failed");
    }
}

  return (
     <AuthLayout>
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          
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

          <Button type="submit" className="w-full">Login</Button>
        </form>
      </Form>
    </AuthLayout>
  )
}

export default Login