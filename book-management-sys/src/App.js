import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BookDashboard from './components/BookDashboard';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Book Management System</Link>
        </nav>
        <Routes>
          <Route path="/" element={<BookDashboard />} />
          {/* Additional routes can go here for other components/pages like Add Book, Edit Book */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
