import React from 'react'

const App = () => {
  return (
    <div className='min-h-screen bg-black text-white flex items-center justify-center'>

      <div className='w-full max-w-2xl bg-zinc-900 rounded-lg p-6'>

        <h1 className='text-2xl font-bold mb-2'>
          Student Study Planner
        </h1>

        <p className='text-gray-400 mb-4'>
          Plan your study sessions clearly
        </p>


        <div className='border border-zinc-700 rounded p-4'>
          <p className='text-gray-500'>
            Study sessions will appear here
          </p>
        </div>

      </div>
    </div>
  )
}

export default App