import React from 'react';
import { Button, Form } from 'react-bootstrap';

function BookForm({ bookData, onInputChange, onSubmit, isEditing }) {
  return (
    <Form>
      <Form.Group controlId="bookId">
        <Form.Label>Book ID</Form.Label>
        <Form.Control
          type="text"
          value={bookData.id}
          readOnly 
        />
      </Form.Group>
      <Form.Group controlId="bookTitle">
        <Form.Label>Book Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={bookData.title}
          onChange={onInputChange}
          placeholder="Enter book title"
        />
      </Form.Group>
      
      <Form.Group controlId="bookAuthor">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          name="author"
          value={bookData.author}
          onChange={onInputChange}
          placeholder="Enter author name"
        />
      </Form.Group>

      <Form.Group controlId="publishedYear">
        <Form.Label>Published Year</Form.Label>
        <Form.Control
          type="number"
          name="published_year"
          value={bookData.published_year}
          onChange={onInputChange}
          min="1890"
          max="2024"
          placeholder="Enter published year"
        />
      </Form.Group>

      <Form.Group controlId="bookGenre">
        <Form.Label>Book Genre</Form.Label>
        <Form.Control
          as="select"
          name="genre"
          value={bookData.genre}
          onChange={onInputChange}
        >
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
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={bookData.description}
          onChange={onInputChange}
          placeholder="Enter book description"
        />
      </Form.Group>
      <div className="d-flex justify-content-end mt-3">
        <Button
          variant={isEditing ? "warning" : "success"}
          onClick={(e) => {
            e.preventDefault(); // Prevents form from submitting if needed
            onSubmit();
          }}
        >
          {isEditing ? 'Edit Book' : 'Add Book'}
        </Button>
      </div>
    </Form>
  );
}

export default BookForm;



