function SessionList({ sessions, onToggle }) {
  return (
    <div className="space-y-3">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="border border-zinc-700 rounded p-3 cursor-pointer"
          onClick={() => onToggle(session.id)}
        >
          <p className="font-semibold">
            {session.subject}
          </p>
          <p className="text-gray-400 text-sm">
            {session.day} • {session.duration} minutes
          </p>
          <p className="text-gray-500 text-sm">
            Status: {session.completed ? "Completed" : "Pending"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default SessionList;
