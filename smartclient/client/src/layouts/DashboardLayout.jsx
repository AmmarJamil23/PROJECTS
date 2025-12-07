import React from 'react'
import { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'


const DashboardLayout = ({ children }) => {
  const [open, setOpen] = useState(false);


  return (
    <div className='flex min-h-screen'>

        <Sidebar open={open} />

        <div className='flex-1 flex flex-col md:ml-64'>
            <Topbar setOpen={setOpen} />

            <main className='p-4'>
                {children}
            </main>
        </div>

    </div>
  )
}

export default DashboardLayout;