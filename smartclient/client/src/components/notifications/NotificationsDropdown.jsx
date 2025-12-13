import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotificationStore } from "@/features/notifications/useNotificationStore";
import { cn } from "@/lib/utils";

export default function NotificationsDropdown() {
  const { notifications, markAsRead, markAllRead } =
    useNotificationStore();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />

          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80">
        <div className="flex justify-between items-center px-2 py-1">
          <p className="font-semibold">Notifications</p>
          <button
            className="text-xs text-blue-500"
            onClick={markAllRead}
          >
            Mark all read
          </button>
        </div>

        <div className="max-h-72 overflow-y-auto">
          {notifications.map((n) => (
            <DropdownMenuItem
              key={n._id}
              onClick={() => markAsRead(n._id)}
              className={cn(
                "flex flex-col items-start gap-1 cursor-pointer",
                !n.read && "bg-muted"
              )}
            >
              <p className="text-sm">{n.text}</p>
              <span className="text-xs text-muted-foreground">
                {n.time}
              </span>
            </DropdownMenuItem>
          ))}

          {notifications.length === 0 && (
            <p className="text-sm text-muted-foreground p-4">
              No notifications
            </p>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
