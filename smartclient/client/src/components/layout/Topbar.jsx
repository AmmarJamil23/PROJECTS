import React from 'react'
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from '@/features/auth/useAuthStore';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import NotificationsDropdown from '../notifications/NotificationsDropdown';
import GlobalSearch from '../search/GlobalSearch';


const Topbar = ({ setOpen }) => {
  const { user, clearAuth } = useAuthStore();

  const logout = () => {
    clearAuth();
    toast.success("Logged out successfully");
  };

 return (
    <header className="h-14 border-b bg-card flex items-center justify-between px-4">
      {/* Mobile sidebar toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setOpen((o) => !o)}
      >
        <Menu size={20} />
      </Button>

      <h1 className="text-lg font-semibold mr-3">Dashboard</h1>

        <GlobalSearch />
      {/* User avatar */}
      <div className="flex items-center gap-2">

        <NotificationsDropdown />

        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarFallback>
            {user?.name?.charAt(0)?.toUpperCase() || "?"}
          </AvatarFallback>
        </Avatar>

        <Button variant="outline" size="sm" onClick={logout}>
          Logout
        </Button>
      </div>
    </header>
  );
}

export default Topbar