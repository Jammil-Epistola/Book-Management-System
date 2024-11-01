import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function BookForm({ show, onHide, onSubmit, bookData, onInputChange, isEditing }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Edit Book' : 'Add New Book'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="bookId">
            <Form.Label>ID</Form.Label>
            <Form.Control type="text" value={bookData.id} readOnly />
          </Form.Group>
          <Form.Group controlId="bookTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" value={bookData.title} onChange={onInputChange} />
          </Form.Group>
          <Form.Group controlId="bookAuthor">
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" name="author" value={bookData.author} onChange={onInputChange} />
          </Form.Group>
          <Form.Group controlId="publishedYear">
            <Form.Label>Published Year</Form.Label>
            <Form.Control type="number" name="published_year" value={bookData.published_year} onChange={onInputChange} min="1890" max="2024" />
          </Form.Group>
          <Form.Group controlId="bookGenre">
            <Form.Label>Genre</Form.Label>
            <Form.Control as="select" name="genre" value={bookData.genre} onChange={onInputChange}>
              <option>Choose...</option>
              <option>Fiction</option>
              <option>Non-Fiction</option>
              <option>Science Fiction</option>
              <option>Historical Fiction</option>
              <option>Biography</option>
              <option>History</option>
              <option>Dystopian</option>
              <option>Comedy</option>
              <option>Romance</option>
              <option>Horror</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="bookDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={bookData.description} onChange={onInputChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={isEditing ? "warning" : "success"} onClick={onSubmit}>{isEditing ? 'Edit Book' : 'Add Book'}</Button>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BookForm;


