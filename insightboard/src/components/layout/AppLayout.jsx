import { Link, Outlet } from "react-router-dom"

function AppLayout() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r p-4 space-y-4">
        <h2 className="text-lg font-semibold">
          InsightBoard
        </h2>

        <nav className="flex flex-col gap-2">
          <Link to="/">Dashboard</Link>
          <Link to="/analytics">Analytics</Link>
          <Link to="/activity">Activity</Link>
          <Link to="/settings">Settings</Link>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
