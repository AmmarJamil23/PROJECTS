import React from 'react'
import RenderCounter from './RenderCounter'
import { useState, useCallback } from "react"
import Child from './Child';

const App = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Clicked");
  }, []);

  return (
    <div className='min-h-screen bg-gray-900 text-white p-6 space-y-4'>
      <h1 className='text-2xl font-bold'>React Render Lab</h1>

      <button className='px-4 py-2 bg-green-400 rounded font-bold'
      onClick={() => setCount(count + 1)}
      >
        Increment
      </button>

      <p className='mt-2'>Count value: {count}</p>

      <RenderCounter label="App Component" />

      <Child onClick={handleClick} />
      
      </div>
  )
}

export default App