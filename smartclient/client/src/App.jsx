import React from 'react'
import Login from './pages/Login';

const App = () => {
  return (
    <div className='min-h-screen bg-background text-foreground p-6'>
      <h1 className='text-3xl font-bold'>
        Dashboard will be displayed here
        </h1>

      <p className='text-muted-foreground mt-2'>
        Here the SmartClient Frontend will be displayed
        </p>
        <Login />
    </div>
  )
}

export default App;