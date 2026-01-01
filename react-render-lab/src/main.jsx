import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "./ThemeContext.jsx"
import { DebugProvider } from "./context/DebugContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DebugProvider>
   <App />

    </DebugProvider>

  </StrictMode>,
)
