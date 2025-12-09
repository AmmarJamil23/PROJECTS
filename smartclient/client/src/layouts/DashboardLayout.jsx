import React, { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import { cn } from "@/lib/utils";

const DashboardLayout = ({ children }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen">

      <Sidebar open={open} setOpen={setOpen} />

      <div
        className={cn(
          "flex-1 flex flex-col transition-all",
          open ? "ml-64" : "ml-0",
          "md:ml-64"
        )}
      >

        <Topbar setOpen={setOpen} />

        <main className="p-4">
          {children}
        </main>

      </div>

    </div>
  )
}

export default DashboardLayout
