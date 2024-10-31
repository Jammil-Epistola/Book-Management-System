import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Modal } from 'react-bootstrap';
import BookForm from './BookForm';
import BookDetails from './BookDetails';
import './BookList.css';

function BookList() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete confirmation modal
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newBook, setNewBook] = useState({
    id: "",
    title: "",
    author: "",
    published_year: "",
    genre: "",
    description: ""
  });

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error("Error fetching data: ", error));
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddModal = () => {
    const nextId = books.length ? books[books.length - 1].id + 1 : 1;
    setNewBook({ id: nextId, title: "", author: "", published_year: "", genre: "", description: "" });
    setIsEditing(false);
    setShowAddEditModal(true);
  };

  const openEditModal = (book) => {
    setNewBook(book);
    setIsEditing(true);
    setShowAddEditModal(true);
  };

  const closeAddEditModal = () => setShowAddEditModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook(prev => ({ ...prev, [name]: value }));
  };

  const handleAddBook = () => {
    fetch('http://127.0.0.1:8000/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook),
    })
      .then(response => response.json())
      .then(data => {
        setBooks(prev => [...prev, data]);
        closeAddEditModal();
      })
      .catch(error => console.error("Error adding book:", error));
  };

  const handleEditBook = () => {
    fetch(`http://127.0.0.1:8000/api/books/${newBook.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook),
    })
      .then(response => response.json())
      .then(updatedBook => {
        setBooks(prev => prev.map(book => (book.id === updatedBook.id ? updatedBook : book)));
        closeAddEditModal();
      })
      .catch(error => console.error("Error updating book:", error));
  };

  const confirmDelete = (book) => {
    setSelectedBook(book);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    fetch(`http://127.0.0.1:8000/api/books/${selectedBook.id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setBooks(prev => prev.filter(b => b.id !== selectedBook.id));
        setShowDeleteModal(false);
      })
      .catch(error => console.error("Error deleting book:", error));
  };

  const handleDeleteCancel = () => {
    setSelectedBook(null);
    setShowDeleteModal(false);
  };

  const handleViewDetails = (book) => {
    setSelectedBook(book);
    setShowViewModal(true);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h3>Book Management<br />System</h3>
        <hr className="sidebar-line" />
        <Button variant="success" onClick={openAddModal}>+ Add Book</Button>
      </div>

      <div style={{ marginLeft: '250px', padding: '20px' }}>
        <Form inline className="my-4 d-flex justify-content-center">
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
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                  <strong>Author:</strong> {book.author}<br />
                  <strong>Published Year:</strong> {book.published_year}<br />
                  <strong>Genre:</strong> {book.genre}<br />
                  <strong>Description:</strong> {book.description}
                </Card.Text>
                <div className="d-flex justify-content-end">
                  <Button variant="primary" onClick={() => handleViewDetails(book)}>View Details</Button>
                  <Button variant="warning" className="mx-2" onClick={() => openEditModal(book)}>Edit</Button>
                  <Button variant="danger" onClick={() => confirmDelete(book)}>Delete</Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>

      <BookForm
        show={showAddEditModal}
        onHide={closeAddEditModal}
        onSubmit={isEditing ? handleEditBook : handleAddBook}
        bookData={newBook}
        onInputChange={handleInputChange}
        isEditing={isEditing}
      />

      <BookDetails
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        book={selectedBook}
      />

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
    </div>
  );
}

export default BookList;

