import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import ViewBook from './pages/ViewBook';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books initially to populate the list
    fetch('http://127.0.0.1:8000/api/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error("Error fetching data: ", error));
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home books={books} setBooks={setBooks} />} />
          <Route path="/AddBook" element={<AddBook setBooks={setBooks} />} />
          <Route path="/EditBook/:id" element={<EditBook books={books} setBooks={setBooks} />} />
          <Route path="/ViewBook/:id" element={<ViewBook books={books} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;