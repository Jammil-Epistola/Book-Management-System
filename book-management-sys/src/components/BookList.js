import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Form, Modal } from 'react-bootstrap';
import SideNavBar from './SideNavBar';
import './BookList.css';

function BookList({ books, setBooks }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const confirmDelete = (book) => {
    setSelectedBook(book);
    setShowDeleteModal(true);
  };

  const handleEdit = (id) => {
    navigate(`/EditBook/${id}`);
  };

  const handleViewDetails = (book) => {
    setSelectedBook(book);
    navigate(`/ViewBook/${book.id}`);
  };

  const handleDeleteConfirm = () => {
    fetch(`http://127.0.0.1:8000/api/books/${selectedBook.id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete book: ${response.statusText}`);
        }
        setBooks((prev) => prev.filter((b) => b.id !== selectedBook.id));
        setShowDeleteModal(false);
        
        // Show success message
        setSuccessMessage(`"${selectedBook.title}" has been deleted from the Book List.`);
        setShowSuccessModal(true);
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      });
  };

  const handleDeleteCancel = () => {
    setSelectedBook(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="dashboard-container" style={{ display: 'flex' }}>
      {/* Sidebar */}
      <div className="sidebar" style={{ width: '250px', position: 'fixed', top: 0, left: 0, height: '100vh', backgroundColor: '#333', color: 'white', paddingTop: '20px', zIndex: 2 }}>
        <SideNavBar />
      </div>
  
      {/* Main Content */}
      <div className="content-wrapper" style={{ marginLeft: '250px', padding: '20px', width: 'calc(100% - 250px)' }}>
        <Form className="search-bar my-4">
          <Form.Control
            type="text"
            placeholder="Search for a book"
            style={{ width: '300px' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="outline-success" className="ml-2">Search</Button>
        </Form>
  
        <div className="book-list">
          {filteredBooks.map((book) => (
            <Card key={book.id} className="mb-3" style={{ width: '100%' }}>
              <Card.Body>
                <Card.Title><strong>{book.title}</strong></Card.Title>
                <Card.Text>
                  <strong>Author:</strong> {book.author}<br />
                  <strong>Published Year:</strong> {book.published_year}<br />
                  <strong>Description:</strong> {book.description}
                </Card.Text>
                <div className="d-flex justify-content-end">
                  <Button variant="primary" onClick={() => handleViewDetails(book)}>View Details</Button>
                  <Button variant="warning" className="mx-2" onClick={() => handleEdit(book.id)}>Edit</Button>
                  <Button variant="danger" onClick={() => confirmDelete(book)}>Delete</Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
  
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleDeleteCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this book?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteCancel}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>Confirm</Button>
        </Modal.Footer>
      </Modal>
  
      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>{successMessage}</Modal.Body>
      </Modal>
    </div>
  );
}

export default BookList;
