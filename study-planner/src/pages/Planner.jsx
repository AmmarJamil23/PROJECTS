import { useEffect, useState } from "react";
import SessionForm from "../components/SessionForm";
import SessionList from "../components/SessionList";
import { fetchSessions } from "../api/fakeSessionApi.js";

function Planner() {
  // Core source of truth
  const [loading, setLoading] = useState(true);

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
    {
      id:3,
      subject: "Chemistry",
      day: "Tuesday",
      duration: 90,
      completed: true
    }
  ]);

  // Filter state
  const [selectedDay, setSelectedDay] = useState("All");

  // Form state (local UI state)
  const [subject, setSubject] = useState("");
  const [day, setDay] = useState("Monday");
  const [duration, setDuration] = useState(30);

  // Derived data
  const totalSessions = sessions.length;
  const completedSessions = sessions.filter(
    (s) => s.completed
  ).length;

  const visibleSessions =
    selectedDay === "All"
      ? sessions
      : sessions.filter((s) => s.day === selectedDay);

  // Handlers
  const toggleCompleted = (id) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, completed: !s.completed }
          : s
      )
    );
  };

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

  useEffect(() => {
    let isMounted = true;

    fetchSessions().then((data) => {
      if (isMounted) {
        setSessions(data);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    }
    
  }, [])

  if (loading) {
  return (
    <div>
      <p className="text-gray-400 text-center">
        Loading study sessions...
      </p>
      {/* Form */}
      <SessionForm
        subject={subject}
        setSubject={setSubject}
        day={day}
        setDay={setDay}
        duration={duration}
        setDuration={setDuration}
        onAdd={addSession}
      />

      {/* Filters */}
      <div className="mb-4 flex gap-2">
        {["All", "Monday", "Tuesday", "Wednesday"].map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDay(d)}
            className={`px-3 py-1 rounded text-sm ${
              selectedDay === d
                ? "bg-white text-black"
                : "bg-zinc-800 text-gray-300"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="flex justify-between mb-4 text-sm text-gray-300">
        <p>Total: {totalSessions}</p>
        <p>Completed: {completedSessions}</p>
      </div>

      {/* List */}
      <SessionList
        sessions={visibleSessions}
        onToggle={toggleCompleted}
      />
    </div>
  );
}
}

export default Planner;
