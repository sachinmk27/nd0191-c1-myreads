import React from 'react';
import { Link } from 'react-router-dom';

import BookShelf from '../components/BookShelf';
import BooksGrid from '../components/BooksGrid';
import Book from '../components/Book';

import useBooks from '../useBooks';
import { SHELVES } from '../constants';

const MainPage = () => {
  const { books, handleShelfChange } = useBooks();

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {Object.values(SHELVES).map((shelf) => {
            return (
              <BookShelf key={shelf.slug} title={shelf.label}>
                <BooksGrid>
                  {books
                    .filter((b) => b.shelf === shelf.slug)
                    .map((book) => (
                      <Book
                        key={book.id}
                        book={book}
                        onShelfChange={handleShelfChange}
                      />
                    ))}
                </BooksGrid>
              </BookShelf>
            );
          })}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default MainPage;
