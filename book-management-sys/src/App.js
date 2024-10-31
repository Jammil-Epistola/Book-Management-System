import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<BookList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
