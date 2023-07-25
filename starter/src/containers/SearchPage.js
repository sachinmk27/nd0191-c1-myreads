import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import Book from '../components/Book';
import BooksGrid from '../components/BooksGrid';

import useBooks from '../useBooks';

import * as BooksAPI from '../BooksAPI';

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { handleShelfChange, bookShelfMapping } = useBooks();
  const searchInputRef = useRef(null);

  const booksWithShelf = searchResults.map((book) => ({
    ...book,
    shelf: bookShelfMapping[book.id] || 'none',
  }));

  const handleChange = async (e) => {
    try {
      if (searchInputRef.current.value) {
        const resp = await BooksAPI.search(searchInputRef.current.value, 10);
        if (resp.error) {
          throw new Error(resp.error);
        } else {
          setSearchResults(resp);
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
          {booksWithShelf.map((book) => (
            <Book key={book.id} book={book} onShelfChange={handleShelfChange} />
          ))}
        </BooksGrid>
      </div>
    </div>
  );
};

export default SearchPage;
