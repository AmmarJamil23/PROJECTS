import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import Projects from "@/pages/Projects";
import ProjectDetails from "@/pages/ProjectDetails";
import Settings from "@/pages/Settings";
import Members from "@/pages/Members";
import Login from "@/pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default open register */}
        <Route path="/" element={<Navigate to="/register" replace />} />
         
         <Route path="/login" element={<Login />} />

        {/* Register */}
        <Route path="/register" element={<Register />} />

        {/* Dashboard main */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Dashboard sub pages */}
        <Route path="/dashboard/projects" element={<Projects />} />
        <Route
          path="/dashboard/projects/:projectId"
          element={<ProjectDetails />}
        />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/dashboard/members" element={<Members />} />

      </Routes>
    </BrowserRouter>
  );
}
