import React from 'react'
import { Navigate } from "react-router-dom";
import { useAuthStore } from './useAuthStore';
import Loader from "@/components/ui//loader";

const RequireAuth = ({ children }) => {
    const { token, loading } = useAuthStore();


    //STILL CHECKING TOKEN
    if (loading) return <Loader />;

    // IF THERE ARE NO TOKEN THEN GO TO LOGIN PAGE
    if (!token) return <Navigate to="/login" replace />

  return children;
}

export default RequireAuth