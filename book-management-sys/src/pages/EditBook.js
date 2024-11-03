import React, { useState, useEffect } from 'react';
import { Card, Container, Modal, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import SideNavBar from '../components/SideNavBar';
import BookForm from '../components/BookForm';

function EditBook({ books, setBooks }) {
  const { id } = useParams();
  const [bookData, setBookData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const bookToEdit = books.find((book) => book.id === parseInt(id));
    if (bookToEdit) setBookData(bookToEdit);
  }, [id, books]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!bookData.title) errors.title = "Book Title is required.";
    if (!bookData.author) errors.author = "An Author/s is required.";
    if (!bookData.published_year || bookData.published_year < 1890 || bookData.published_year > 2024)
      errors.published_year = "Enter a valid year between 1890 and 2024.";
    if (!bookData.genre) errors.genre = "A Book Genre is required.";
    if (!bookData.description) errors.description = "Book Description is required.";
    return errors;
  };

  const handleEditBook = () => {
    const errors = validateForm();
    if (Object.keys(errors).length) {
      setValidationErrors(errors);
      setShowErrorModal(true);
      return;
    }

    fetch(`http://127.0.0.1:8000/api/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookData),
    })
      .then(response => response.json())
      .then(updatedBook => {
        if (updatedBook.error) throw new Error(updatedBook.error); // Handle backend validation errors
        setBooks((prev) =>
          prev.map((book) => (book.id === updatedBook.id ? updatedBook : book))
        );
        setShowEditModal(true);
      })
      .catch(error => {
        setApiError("Error updating book. Please try again.");
        setShowErrorModal(true);
      });
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    navigate('/');
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setApiError(null);
    setValidationErrors({});
  };

  if (!bookData) return null;

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <SideNavBar />
      </div>
      <Container style={{ maxWidth: '600px', marginTop: '20px' }}>
        <Card>
          <Card.Header as="h5">Edit Book</Card.Header>
          <Card.Body>
            <BookForm
              bookData={bookData}
              onInputChange={handleInputChange}
              onSubmit={handleEditBook}
              isEditing={true}
            />
          </Card.Body>
        </Card>
      </Container>

      {/* Confirmation Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Book Edited</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>The book has been successfully updated.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseEditModal}>Okay</Button>
        </Modal.Footer>
      </Modal>

      {/* Error Modal */}
      <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {apiError ? (
            <p>{apiError}</p>
          ) : (
            <ul>
              {Object.values(validationErrors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseErrorModal}>Understood</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditBook;
