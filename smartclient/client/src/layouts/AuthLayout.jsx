import React from 'react'

const AuthLayout = ({ children }) => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-background px-4'>
        <div className='w-full max-w-md bg-card shadow-lg rounded-lg p-8'>
            {children}
        </div>
    </div>
  )
}

export default AuthLayout