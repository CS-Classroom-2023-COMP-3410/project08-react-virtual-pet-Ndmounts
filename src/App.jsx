// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import AchievementsPage from './pages/AchievementsPage';

export default function App() {
  console.log('App component loaded');

  return (
    <Router>
      <div className="app-container">
        {/* header */}
        <header className="app-header">
          <div className="container">
            <h1>Virtual Pet</h1>
            <ul className="nav-list">
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/achievements"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Achievements
                </NavLink>
              </li>
            </ul>
          </div>
        </header>

        {/* pages */}
        <main className="container main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/achievements" element={<AchievementsPage />} />
          </Routes>
        </main>

        {/* footer */}
        <footer className="app-footer container">
          © {new Date().getFullYear()} Virtual Pet Demo
        </footer>
      </div>
    </Router>
  );
}
