import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, Row, Col } from 'react-bootstrap';

function BookDashboard() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBook, setNewBook] = useState({
    id: "",
    title: "",
    author: "",
    publishedYear: "",
    genre: "",
    description: ""
  });

  // Fetch books from backend
  useEffect(() => {
    fetch('/api/books')
      .then(response => response.json())
      .then(data => setBooks(data));
  }, []);

  // Filter books based on search query
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const openAddModal = () => {
    setNewBook({
      id: "",
      title: "",
      author: "",
      publishedYear: "",
      genre: "",
      description: ""
    });
    setShowAddModal(true);
  };

  const closeAddModal = () => setShowAddModal(false);

  // Auto-generate 8-digit ID
  const generateId = () => {
    setNewBook(prev => ({ ...prev, id: Math.floor(10000000 + Math.random() * 90000000) }));
  };

  const handleAddBookChange = (e) => {
    const { name, value } = e.target;
    setNewBook(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      {/* Search Bar */}
      <Form inline className="my-4">
        <Form.Control
          type="text"
          placeholder="Search for a book"
          className="mr-sm-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="outline-success">Search</Button>
        <Button variant="success" className="ml-2" onClick={openAddModal}>
          + Add Book
        </Button>
      </Form>

      {/* Book Cards in rows */}
      <div className="book-list">
        {filteredBooks.map((book) => (
          <Card key={book.id} className="mb-3" style={{ width: '100%' }}>
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Card.Text>
                <strong>Author:</strong> {book.author}<br />
                <strong>Published Year:</strong> {book.publishedYear}<br />
                <strong>Genre:</strong> {book.genre}<br />
                <strong>Description:</strong> {book.description}
              </Card.Text>
              <Button variant="primary" onClick={() => openModal(book)}>View Details</Button>
              <Button variant="danger" className="ml-2">Delete</Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Book Details Modal */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedBook?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Author:</strong> {selectedBook?.author}</p>
          <p><strong>Published Year:</strong> {selectedBook?.publishedYear}</p>
          <p><strong>Genre:</strong> {selectedBook?.genre}</p>
          <p><strong>Description:</strong> {selectedBook?.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Add Book Modal */}
      <Modal show={showAddModal} onHide={closeAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group controlId="bookId">
                  <Form.Label>ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={newBook.id}
                    readOnly
                    placeholder="Click to auto-generate"
                  />
                  <Button variant="outline-primary" onClick={generateId} className="mt-2">
                    Generate ID
                  </Button>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="bookTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newBook.title}
                onChange={handleAddBookChange}
              />
            </Form.Group>
            <Form.Group controlId="bookAuthor">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={newBook.author}
                onChange={handleAddBookChange}
              />
            </Form.Group>
            <Form.Group controlId="publishedYear">
              <Form.Label>Published Year</Form.Label>
              <Form.Control
                type="date"
                name="publishedYear"
                value={newBook.publishedYear}
                onChange={handleAddBookChange}
              />
            </Form.Group>
            <Form.Group controlId="bookGenre">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                as="select"
                name="genre"
                value={newBook.genre}
                onChange={handleAddBookChange}
              >
                <option>Choose...</option>
                <option>Fiction</option>
                <option>Non-Fiction</option>
                <option>Science Fiction</option>
                <option>Biography</option>
                <option>History</option>
                <option>Romance</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="bookDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={newBook.description}
                onChange={handleAddBookChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeAddModal}>Close</Button>
          <Button variant="primary">Add Book</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BookDashboard;

