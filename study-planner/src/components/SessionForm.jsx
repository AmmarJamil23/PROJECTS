function SessionForm({
  subject,
  setSubject,
  day,
  setDay,
  duration,
  setDuration,
  onAdd,
}) {
  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-2">
      <input
        className="bg-zinc-800 text-white p-2 rounded text-sm"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <select
        className="bg-zinc-800 text-white p-2 rounded text-sm"
        value={day}
        onChange={(e) => setDay(e.target.value)}
      >
        <option>Monday</option>
        <option>Tuesday</option>
        <option>Wednesday</option>
      </select>

      <input
        type="number"
        className="bg-zinc-800 text-white p-2 rounded text-sm"
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
      />

      <button
        className="bg-white text-black rounded px-3 text-sm"
        onClick={onAdd}
      >
        Add
      </button>
    </div>
  );
}

export default SessionForm;
