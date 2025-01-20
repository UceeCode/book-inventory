import React from 'react';
import '../styles/BookCard.css';

interface BookCardProps {
  book: {
    name: string;
    isbn: string;
    authors: string[];
    publisher: string;
    released: string;
  };
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="book-card">
      <h3 className="book-title">{book.name}</h3>
      <p><strong>Publisher:</strong> {book.publisher}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>Authors:</strong> {book.authors.join(', ')}</p>
      <p><strong>Release Date:</strong> {book.released}</p>
    </div>
  );
};

export default BookCard;
