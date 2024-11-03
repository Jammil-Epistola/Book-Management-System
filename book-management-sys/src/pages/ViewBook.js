import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookDetails from '../components/BookDetails';
import SideNavBar from '../components/SideNavBar';

function ViewBook({ books }) {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Find the book from the books array or fetch it from the API
    const foundBook = books.find(b => b.id === parseInt(id));
    if (foundBook) {
      setBook(foundBook);
    } else {
      // Fetch book if not found in the books array
      fetch(`http://127.0.0.1:8000/api/books/${id}`)
        .then(response => response.json())
        .then(data => setBook(data))
        .catch(error => console.error("Error fetching book:", error));
    }
  }, [id, books]);

  const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
  };

  const contentStyle = {
    flex: 1,
    padding: '20px',
    marginLeft: '200px',
  };

  return(
    <div style={containerStyle}>
      <SideNavBar />
      <div style={contentStyle}>
        <BookDetails book={book} />
      </div>
    </div>
  ); 
}

export default ViewBook;