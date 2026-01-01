import React from 'react'
import RenderBox from './RenderBox'

const ChildBox = ({ onAction }) => {
  return (
    <div className='bg-zinc-900 rounded-lg p-4' onClick={onAction}>
        <RenderBox name= "Child Component" />

        <p className='text-gray-400 text-xs mt-2'>
          Click me
        </p>
    </div>
  )
}

export default React.memo(ChildBox)