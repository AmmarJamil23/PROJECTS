import React from 'react'
import { useState } from 'react'
import SessionForm from "./components/SessionForm";
import SessionList from "./components/SessionList";

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

  const [selectedDay, setSelectedDay] = useState("All");
  const [subject, setSubject] = useState("");
  const [day, setDay] = useState("Monday");
  const [duration, setDuration] = useState(30);

  const toggleCompleted = (id) => {
    setSessions((prevSessions) =>
      prevSessions.map((session) =>
      session.id === id
      ? { ...session, completed: !session.completed }
      : session));
  };

  const totalSessions = sessions.length;
  const completedSessions = sessions.filter(
    (session) => session.completed
  ).length;

  const visibleSessions = 
  selectedDay === "All"
  ? sessions
  : sessions.filter(
    (session) => session.day === selectedDay
  );

  const addSession = () => {
    if (!subject.trim()) return;

    setSessions((prev) => [
      ...prev,
      {
        id: Date.now(),
        subject,
        day,
        duration,
        completed: false,
      },
    ]);

    setSubject("");
    setDuration(30);
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

  <SessionForm
  subject={subject}
  setSubject={setSubject}
  day={day}
  setDay={setDay}
  duration={duration}
  setDuration={setDuration}
  onAdd={addSession}
/>

<div className="flex justify-between mb-4 text-sm text-gray-300">
  <p>Total: {totalSessions}</p>
  <p>Completed: {completedSessions}</p>
</div>

<SessionList
  sessions={visibleSessions}
  onToggle={toggleCompleted}
/>


    
      </div>
    </div>
  )
}

export default App