import React from 'react'
import DashboardLayout from '../layouts/DashboardLayout';

const DashboardPage = () => {
  return (
   <DashboardLayout>
    <h1 className='text-2xl font-semibold'>Dashboard</h1>
    <p className='mt-2'>Layout is now active</p>
   </DashboardLayout>
  )
}

export default DashboardPage;