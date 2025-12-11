import { FilePlus, Edit, UserPlus } from "lucide-react";

export default function ActivityIcon({ type }) {
  switch (type) {
    case "task-create":
      return <FilePlus size={20} className="text-green-500" />;
    case "task-update":
      return <Edit size={20} className="text-blue-500" />;
    case "member-add":
      return <UserPlus size={20} className="text-purple-500" />;
    default:
      return <FilePlus size={20} />;
  }
}
