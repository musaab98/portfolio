import React, { useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import './App.css';

function App() {
  const [isNightMode, setNightMode] = useState(false);

  const toggleTheme = () => {
    setNightMode(!isNightMode);
    if (!isNightMode) {
      document.body.classList.add('night-mode');
      document.documentElement.classList.add('night-mode');
    } else {
      document.body.classList.remove('night-mode');
      document.documentElement.classList.remove('night-mode');
    }
  };
  

  return (
    <Router>
      <Navbar toggleTheme={toggleTheme} />
      <div className={isNightMode ? 'night-mode' : 'day-mode'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
