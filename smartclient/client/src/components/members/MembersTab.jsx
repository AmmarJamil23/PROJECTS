import { useMemberStore } from "@/features/members/useMemberStore";
import { Button } from "@/components/ui/button";
import AddMemberModal from "./AddMemberModal";
import { Trash } from "lucide-react";
import { toast } from "sonner";

export default function MembersTab() {
  const { members, removeMember } = useMemberStore();

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Members</h2>
        <AddMemberModal />
      </div>

      {/* List */}
      <div className="space-y-3">
        {members.map((m) => (
          <div
            key={m._id}
            className="border rounded-lg p-4 bg-card flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{m.name}</p>
              <p className="text-sm text-muted-foreground">{m.email}</p>
              <p className="text-xs mt-1 text-blue-500 capitalize">
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
      </div>
    </div>
  );
}
