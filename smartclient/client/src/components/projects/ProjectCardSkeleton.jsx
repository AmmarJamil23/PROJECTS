import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const ProjectCardSkeleton = () => {
  return (
    <div className='p-4 border rounded-lg bg-card shadow-sm'>
        <Skeleton className="h-5 w-2/3 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />

    </div>
  )
}

export default ProjectCardSkeleton