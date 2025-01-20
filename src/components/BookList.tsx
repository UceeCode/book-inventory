import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { fetchBooks, fetchCharacter } from '../services/api';
import BookCard from './BookCard';
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';
import '../styles/BookList.css';

interface Book {
  name: string;
  isbn: string;
  authors: string[];
  publisher: string;
  released: string;
}

interface Character {
  name: string;
  culture: string;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filterResults = useCallback(
    (books: Book[], characters: Character[], searchTerm: string) => {
      if (!searchTerm) {
        setFilteredBooks(books);
        return;
      }

      const lowerSearchTerm = searchTerm.toLowerCase();

      const bookMatches = books.filter(
        (book) =>
          book.name.toLowerCase().includes(lowerSearchTerm) ||
          book.isbn.toLowerCase().includes(lowerSearchTerm) ||
          book.publisher.toLowerCase().includes(lowerSearchTerm) ||
          book.authors.some((author) => author.toLowerCase().includes(lowerSearchTerm)) ||
          book.released.toLowerCase().includes(lowerSearchTerm)
      );

      const characterMatches = characters.filter(
        (character) =>
          character.name.toLowerCase().includes(lowerSearchTerm) ||
          character.culture.toLowerCase().includes(lowerSearchTerm)
      );

      const highlightedBooks = books.filter((book) =>
        characterMatches.some((char) => book.authors.includes(char.name))
      );

      const uniqueBooks = Array.from(new Set([...highlightedBooks, ...bookMatches]));
      setFilteredBooks(uniqueBooks);
    },
    []
  );

  const loadBooksAndCharacters = useCallback(async () => {
    if (loading) return;
  
    setLoading(true);
  
    try {
      const [booksData, charactersData] = await Promise.all([fetchBooks(), fetchCharacter()]);
      setBooks(booksData);
      setCharacters(charactersData);
      filterResults(booksData, charactersData, searchTerm);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, searchTerm, filterResults]);
  
  

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setSearchTerm(term);
    }, 300),
    []
  );

  useEffect(() => {
    loadBooksAndCharacters();
  }, [loadBooksAndCharacters]);

  useEffect(() => {
    filterResults(books, characters, searchTerm);
  }, [books, characters, searchTerm, filterResults]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    debouncedSearch(value);
  };

  return (
    <div className="book-list">
      <SearchBar onSearchChange={handleSearchChange} />
      <div className="book-cards">
        {filteredBooks.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
      {loading && <LoadingSpinner />}
      {!loading && filteredBooks.length === 0 && (
        <p className="status-text">No books or characters found. Try a different search term.</p>
      )}
    </div>
  );
};

export default BookList;
