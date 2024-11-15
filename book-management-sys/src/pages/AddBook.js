import React, { useState, useEffect } from 'react';
import { Card, Container, Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SideNavBar from '../components/SideNavBar';
import BookForm from '../components/BookForm';

function AddBook({ setBooks }) {
  const [newBook, setNewBook] = useState({
    id: '',
    title: '',
    author: '',
    published_year: '',
    genre: '',
    description: ''
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/books')
      .then(response => response.json())
      .then(data => {
        const nextId = data.length ? data[data.length - 1].id + 1 : 1;
        setNewBook(prev => ({ ...prev, id: nextId }));
      })
      .catch(error => setApiError("Error fetching data."));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!newBook.title) errors.title = "Book Title is required.";
    if (!newBook.author) errors.author = "An Author/s is required.";
    if (!newBook.published_year || newBook.published_year < 1890 || newBook.published_year > 2024)
      errors.published_year = "Enter a valid year between 1890 and 2024.";
    if (!newBook.genre) errors.genre = "A Book Genre is required.";
    if (!newBook.description) errors.description = "Book Description is required.";
    return errors;
  };

  const handleAddBook = () => {
    const errors = validateForm();
    if (Object.keys(errors).length) {
      setValidationErrors(errors);
      return;
    }

    fetch('http://127.0.0.1:8000/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        setBooks(prev => [...prev, data]);
        setShowAddModal(true);
        setNewBook({
          id: data.id + 1,
          title: '',
          author: '',
          published_year: '',
          genre: '',
          description: ''
        });
      })
      .catch(error => setApiError("Error adding book. Please try again."));
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setApiError(null);
    setValidationErrors({});
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <SideNavBar activePage="add book"/>
      </div>
      <Container style={{ maxWidth: '600px', marginTop: '20px' }}>
        <Card>
          <Card.Header as="h5">Add New Book</Card.Header>
          <Card.Body>
            <BookForm
              bookData={newBook}
              onInputChange={handleInputChange}
              onSubmit={handleAddBook}
              isEditing={false}
            />
          </Card.Body>
        </Card>
      </Container>

      {/* Error Modal */}
      <Modal show={Object.keys(validationErrors).length > 0 || apiError} onHide={() => setValidationErrors({})}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {Object.values(validationErrors).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
            {apiError && <li>{apiError}</li>}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setValidationErrors({})}>Understood</Button>
        </Modal.Footer>
      </Modal>

      {/* Confirmation Modal */}
      <Modal show={showAddModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Book Added</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>The book has been added to the list.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>Okay</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddBook;
