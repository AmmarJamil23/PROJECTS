import React from 'react'
import { useState } from 'react'

const App = () => {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      subject: "Math",
      day: "Monday",
      duration: 60,
      completed: false,
    },
    {
      id: 2,
      subject: "Physics",
      day: "Tuesday",
      duration: 45,
      completed: true,
    },
  ]);

  const toggleCompleted = (id) => {
    setSessions((prevSessions) =>
      prevSessions.map((session) =>
      session.id === id
      ? { ...session, completed: !session.completed }
      : session));
  };



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

        <div className='space-y-3'>
          {sessions.map((session) => (
            <div
            key={session.id}
            className='border border-zinc-700 rounded p-3 cursor-pointer'
            onClick={() => toggleCompleted(session.id)}
            >
              <p>
                {session.day} . {session.duration} minutes
              </p>

              <p className='text-gray-500 text-sm'>
                Status: {session.completed ? "Completed" : "Pending"}
              </p>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default App