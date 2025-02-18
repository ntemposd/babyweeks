import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './style/App.css';
import BabyWeeksCalculator from './components/BabyWeeksCalculator';
import AboutPage from './components/AboutPage'; // Optional: Add another page if needed

function App() {
  return (
    <Router basename="/babyweeks">
      <Routes>
        {/* Define the route for the main calculator */}
        <Route path="/" element={<BabyWeeksCalculator />} />
        {/* Optional: Add a route for an "About" page */}
        <Route path="/about" element={<AboutPage />} />
        {/* Catch-all route */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
