import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function BookDetails({ show, onHide, book }) {
  if (!book) {
    return null; 
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Book Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <p><strong>Book ID:</strong> {book.id}</p>
        <p><strong>Title:</strong> {book.title}</p>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Published Year:</strong> {book.published_year}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
        <p><strong>Description:</strong> {book.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BookDetails;