import React from 'react';
import BookList from '../components/BookList';

function Home({ books, setBooks }) {
  return (
    <div>
      <BookList books={books} setBooks={setBooks} />
    </div>
  );
}

export default Home;