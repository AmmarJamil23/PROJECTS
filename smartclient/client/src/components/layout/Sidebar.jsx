import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Folder, Users2, Settings } from "lucide-react";

const navItems = [
  { name: "Home", icon: Home, to: "/dashboard" },
  { name: "Projects", icon: Folder, to: "/dashboard/projects" },
  { name: "Members", icon: Users2, to: "/dashboard/members" },
  { name: "Settings", icon: Settings, to: "/dashboard/settings" }
];

const Sidebar = ({ open }) => {
  const location = useLocation();

  return (
    <div
      className={cn(
        "bg-card border-r shadow-sm h-full fixed md:static top-0 left-0 z-50 transition-all overflow-hidden",
        open ? "w-64" : "w-0 md:w-64"
      )}
    >
      <div className="p-4 text-xl font-bold">My Workspace</div>

      <nav className="px-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.to;

          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar;
