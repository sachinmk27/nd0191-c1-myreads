import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import Book from '../components/Book';
import BooksGrid from '../components/BooksGrid';

import useBooks from '../useBooks';

import * as BooksAPI from '../BooksAPI';
import { debounce } from '../utils';

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { handleShelfChange, bookShelfMapping } = useBooks();
  const abortRef = useRef(null);

  const handleChange = async (e) => {
    try {
      if (abortRef.current) {
        abortRef.current.abort();
      }
      abortRef.current = new AbortController();
      if (e.target.value) {
        const resp = await BooksAPI.search(
          e.target.value,
          10,
          abortRef.current.signal
        );
        if (resp.error) {
          setSearchResults([]);
          throw new Error(resp.error);
        } else {
          setSearchResults(resp);
        }
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const booksWithShelf = searchResults.map((book) => ({
    ...book,
    shelf: bookShelfMapping[book.id] || 'none',
  }));

  const debouncedHandleChange = debounce(handleChange);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            onChange={debouncedHandleChange}
            type="text"
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div className="search-books-results">
        <BooksGrid>
          {booksWithShelf.map((book) => (
            <Book key={book.id} book={book} onShelfChange={handleShelfChange} />
          ))}
        </BooksGrid>
      </div>
    </div>
  );
};

export default SearchPage;
