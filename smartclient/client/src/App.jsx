import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./features/auth/useAuthStore";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard"
import RequireAuth from "./features/auth/RequireAuth";

export default function App() {
  const finishLoading = useAuthStore((s) => s.finishLoading);

  useEffect(() => {
    finishLoading();
  }, []);

  return (
    <>
    <BrowserRouter>
    {/* Public Routes */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        {/* Protected Routes */}
        <Route 
        path="/dashboard"
        element={
            <Dashboard />
          
        }
        />

      </Routes>
    </BrowserRouter>
    </>
  );
}
