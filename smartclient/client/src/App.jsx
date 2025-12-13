import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import Projects from "@/pages/Projects";
import ProjectDetails from "@/pages/ProjectDetails";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* TEMPORARY: Public access for UI testing */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/dashboard/projects" element={<Projects />} />

        <Route path="/dashboard/projects/:projectId" element={<ProjectDetails />}
/>

      </Routes>
    </BrowserRouter>
  );
}


