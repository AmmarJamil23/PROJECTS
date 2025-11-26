import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen grid grid-cols-[220px_1fr]">
      {/* Sidebar */}
      <Sidebar />

      {/* Right side content */}
      <div className="flex flex-col">
        <Navbar />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
