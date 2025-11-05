import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";

function Providers() {
  const token = localStorage.getItem("token");
  return (
    <AuthProvider>
      <SocketProvider token={token}>
        <App />
      </SocketProvider>
    </AuthProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Providers />
  </React.StrictMode>
);
