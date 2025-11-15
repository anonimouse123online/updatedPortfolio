// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Portfolio from './components/portfolio';
import './index.css';

export default function App() {
  return (
      <Routes>
        {/* Redirect root to /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Define all section-based routes */}
        <Route path="/home" element={<Portfolio />} />
        <Route path="/projects" element={<Portfolio />} />
        <Route path="/experiences" element={<Portfolio />} />
        <Route path="/about" element={<Portfolio />} />
        <Route path="/contact" element={<Portfolio />} />

        {/* Fallback 404 */}
        <Route path="*" element={<div className="p-8">Page not found</div>} />
      </Routes>
  );
}