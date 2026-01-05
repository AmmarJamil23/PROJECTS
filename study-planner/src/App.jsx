import React from 'react'
import { Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Planner from './pages/Planner';
import About from "./pages/About";
import MainLayout from './layouts/MainLayout';

const App = () => {
  return (
 
    <Routes>
      <Route element={<MainLayout />}>

      <Route path="/" element={<Home />} />
      <Route path="/planner" element={<Planner />} />
      <Route path="/about" element={<About />} />

      </Route>

    </Routes>

  )
}

export default App