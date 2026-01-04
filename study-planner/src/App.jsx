import React from 'react'
import { Routes, Route, Link} from "react-router-dom";
import Home from './pages/Home';
import Planner from './pages/Planner';
import About from "./pages/About";

const App = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
  <div className="w-full max-w-2xl bg-zinc-900 rounded-lg p-6">
    <nav className="flex gap-4 mb-6 text-sm">
      <Link to="/" className="text-gray-300 hover:text-white">
        Home
      </Link>
      <Link to="/planner" className="text-gray-300 hover:text-white">
        Planner
      </Link>
      <Link to="/about" className="text-gray-300 hover:text-white">
        About
      </Link>
    </nav>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/planner" element={<Planner />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </div>
</div>

  )
}

export default App