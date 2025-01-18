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

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [characters, setCharacters] = useState<any[]>([]);  // Assuming character data
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Fetch books and characters concurrently
  const loadBooksAndCharacters = useCallback(
    async (reset: boolean = false) => {
      if (loading) return;

      setLoading(true);

      try {
        // Fetch books and characters concurrently
        const [booksData, charactersData] = await Promise.all([
          fetchBooks(page, searchTerm),
          fetchCharacter(searchTerm)
        ]);

        setBooks((prevBooks) => (reset ? booksData : [...prevBooks, ...booksData]));
        setCharacters(charactersData);  // Assuming you're fetching all characters

        setHasMore(booksData.length > 0);
      } catch (error) {
        console.error('Error fetching books and characters:', error);
      } finally {
        setLoading(false);
        setIsSearching(false);
      }
    },
    [page, searchTerm, loading]
  );

  // Handle pagination and initial load
  useEffect(() => {
    loadBooksAndCharacters();
  }, [page, loadBooksAndCharacters]);

  // Handle search term changes with debounce
  const debouncedSearch = useCallback(
    debounce((newSearchTerm: string) => {
      setPage(1);
      setBooks([]); // Clear books results for fresh search
      setCharacters([]); // Clear characters for fresh search
      setIsSearching(true);
      loadBooksAndCharacters(true);
    }, 300),
    [loadBooksAndCharacters]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setSearchTerm(value);
    debouncedSearch(value); // Debounced input handling
  };

  return (
    <div className="book-list">
      <SearchBar onSearchChange={handleSearchChange} />
      <div className="book-cards">
        {books.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
      {isSearching && <p className="status-text">Searching for books...</p>}
      {loading && !isSearching && <LoadingSpinner />}
      {hasMore && !loading && !isSearching && (
        <button className="load-more-btn" onClick={() => setPage((prev) => prev + 1)}>
          Load More
        </button>
      )}
      {!loading && books.length === 0 && !isSearching && (
        <p className="status-text">No books found. Try a different search term.</p>
      )}

    </div>
  );
};

export default BookList;
