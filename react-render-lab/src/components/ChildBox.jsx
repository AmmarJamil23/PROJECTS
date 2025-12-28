import React from 'react'
import RenderBox from './RenderBox'

const ChildBox = () => {
  return (
    <div className='bg-zinc-900 rounded-lg p-4'>
        <RenderBox name= "Child Component" />
    </div>
  )
}

export default React.memo(ChildBox)