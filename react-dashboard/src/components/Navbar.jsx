function Navbar() {
  return (
    <header className="w-full bg-blue-100 border-b px-6 py-3 flex items-center justify-between">
      {/* Left: Search */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-2 border rounded-md w-64 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right: Placeholder Buttons */}
      <div className="flex items-center gap-3">
        <button className="px-3 py-2 bg-gray-100 rounded-md text-sm hover:bg-gray-200">
          Alerts
        </button>
        <button className="px-3 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-gray-200">
          Profile
        </button>
      </div>
    </header>
  );
}

export default Navbar;
