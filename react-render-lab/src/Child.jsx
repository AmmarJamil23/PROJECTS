import React from 'react'
import RenderCounter from "./RenderCounter";


const Child = ({ onClick }) => {
  return (
    <div className='border border-blue-700 p-4 mt-4' onClick={onClick}>
        <p>Child Component (Click Me)</p>
        <RenderCounter label="Child Component" />
    </div>
  )
}

export default React.memo(Child)