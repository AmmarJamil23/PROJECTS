import { useMemberStore } from "@/features/members/useMemberStore";
import { useActivityStore } from "@/features/activity/useActivityStore";
import { useTaskStore } from "@/components/tasks/useTaskStore";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function OverviewTab() {
  const tasks = useTaskStore((s) => s.tasks);
  const members = useMemberStore((s) => s.members);
  const activity = useActivityStore((s) => s.activity);

  const todo = tasks.filter((t) => t.status === "todo").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const done = tasks.filter((t) => t.status === "done").length;

  const total = tasks.length;
  const progress = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="space-y-8">

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <Card>
          <CardHeader>
            <CardTitle>Total Tasks</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{total}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{members.length}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed Tasks</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{done}</CardContent>
        </Card>

      </div>

      {/* Progress Section */}
      <Card>
        <CardHeader>
          <CardTitle>Project Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2">Overall completion</p>
          <Progress value={progress} className="h-2" />
          <p className="text-sm mt-2 font-medium">{progress} percent</p>
        
          <div className="flex gap-6 mt-4 text-sm">
            <span>To Do: {todo}</span>
            <span>In Progress: {inProgress}</span>
            <span>Done: {done}</span>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {activity.slice(0, 3).map((a) => (
            <div key={a._id} className="border-b pb-2">
              <p className="text-sm">
                <strong>{a.user}</strong> {a.action}{" "}
                <strong>{a.target}</strong>
              </p>
              <p className="text-xs text-muted-foreground">{a.time}</p>
            </div>
          ))}

          {activity.length === 0 && (
            <p className="text-sm text-muted-foreground">No recent activity yet.</p>
          )}
        </CardContent>
      </Card>

    </div>
  );
}
