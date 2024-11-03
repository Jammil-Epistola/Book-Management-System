import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function BookDetails({ book }) {
  const navigate = useNavigate();

  if (!book) {
    return null;
  }

  return (
    <div className="container mt-5">
      <Card>
        <Card.Header>
          <h3>Book Details</h3>
        </Card.Header>
        <Card.Body>
          <p><strong>Book ID:</strong> {book.id}</p>
          <p><strong>Title:</strong> {book.title}</p>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Published Year:</strong> {book.published_year}</p>
          <p><strong>Genre:</strong> {book.genre}</p>
          <p><strong>Description:</strong> {book.description}</p>
        </Card.Body>
        <Card.Footer>
          <Button variant="secondary" onClick={() => navigate('/')}>Return to Home</Button>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default BookDetails;