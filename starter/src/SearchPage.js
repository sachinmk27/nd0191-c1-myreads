import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import BooksGrid from './BooksGrid';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import useBooks from './useBooks';

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { bookShelfMapping, handleShelfChange } = useBooks();
  const searchInputRef = useRef(null);

  const handleChange = async (e) => {
    try {
      if (searchInputRef.current.value) {
        const resp = await BooksAPI.search(searchInputRef.current.value, 10);
        console.log(resp);
        if (resp.error) {
          throw new Error(resp.error);
        } else {
          setSearchResults(
            resp.map((book) => ({
              ...book,
              shelf: bookShelfMapping[book.id] || 'none',
            }))
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            ref={searchInputRef}
            onChange={handleChange}
            type="text"
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div className="search-books-results">
        <BooksGrid>
          {searchResults.map((book) => (
            <Book key={book.id} book={book} onShelfChange={handleShelfChange} />
          ))}
        </BooksGrid>
      </div>
    </div>
  );
};

export default SearchPage;
