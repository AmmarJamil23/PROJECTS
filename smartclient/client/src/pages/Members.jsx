import DashboardLayout from "@/layouts/DashboardLayout";
import { useMemberStore } from "@/features/members/useMemberStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";

export default function Members() {
  const { members, removeMember } = useMemberStore();

  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-6">
        <h1 className="text-2xl font-bold">Workspace Members</h1>

        <Card>
          <CardHeader>
            <CardTitle>All Members</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {members.map((m) => (
              <div
                key={m._id}
                className="flex justify-between items-center border p-4 rounded-lg"
              >
                <div>
                  <p className="font-semibold">{m.name}</p>
                  <p className="text-sm text-muted-foreground">{m.email}</p>
                  <p className="text-xs text-blue-500 capitalize">
                    Role: {m.role}
                  </p>
                </div>

                {m.role !== "owner" && (
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      removeMember(m._id);
                      toast.success("Member removed");
                    }}
                  >
                    <Trash size={18} />
                  </Button>
                )}
              </div>
            ))}

            {members.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No members found.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
