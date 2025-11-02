import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; // Import useLocation
import Home from './components/Home/Home.jsx';
import Team from './components/Team/Team.jsx';
import Sports from './components/Sports/Sports.jsx';
import Pool from './components/Pool/Pool.jsx';
import PointsTable from './components/PointsTable/PointsTable.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import LeaderBoard from './components/LeaderBoard/LeaderBoard.jsx';
import './App.css';
import Gallery from './components/Gallery/Gallery.jsx';
import Footer from './components/Footer/Footer.jsx';

// Create a new component to handle conditional rendering
function AppContent() {
  // Get the current location object
  const location = useLocation();

  // Determine if the current path is the home page ("/")
  const isHomePage = location.pathname === '/';

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/pool" element={<Pool />} />
        <Route path="/points-table" element={<PointsTable />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/branch-leaderboard" element={<LeaderBoard />} />
      </Routes>

      {/* Conditional Rendering: Render Footer only if it's NOT the home page */}
      {!isHomePage && <Footer />}
    </>
  );
}

function App() {
  return (
    // The Router must wrap any component that uses useLocation
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;