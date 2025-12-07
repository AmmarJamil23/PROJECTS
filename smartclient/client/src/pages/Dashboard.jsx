import DashboardLayout from "@/layouts/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">Welcome Back</h2>
      <p className="text-muted-foreground">Your productivity hub is ready.</p>
    </DashboardLayout>
  );
}
