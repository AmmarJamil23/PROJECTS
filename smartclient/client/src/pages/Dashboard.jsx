import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { useTaskStore } from "@/components/tasks/useTaskStore";
import { useMemberStore } from "@/features/members/useMemberStore";
import { useProjects } from "@/features/projects/useProjects"; // dummy mode

import { Link } from "react-router-dom";

export default function Dashboard() {
  const tasks = useTaskStore((s) => s.tasks);
  const members = useMemberStore((s) => s.members);
  const { data: projects } = useProjects();

  return (
    <DashboardLayout>
      
      {/* Welcome Banner */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground mt-1">
          Here's what's happening in your workspace.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        
        <Card>
          <CardHeader>
            <CardTitle>Total Projects</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {projects.length}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Tasks</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {tasks.length}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {members.length}
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Projects</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {projects.slice(0, 3).map((p) => (
            <Link
              key={p._id}
              to={`/dashboard/projects/${p._id}`}
              className="block p-3 border rounded-md hover:bg-muted transition"
            >
              <p className="font-semibold">{p.name}</p>
              <p className="text-sm text-muted-foreground">
                {p.description}
              </p>
            </Link>
          ))}

          {projects.length === 0 && (
            <p className="text-muted-foreground text-sm">
              No projects yet. Create one from the Projects page.
            </p>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
