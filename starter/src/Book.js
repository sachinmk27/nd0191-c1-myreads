import React from 'react';
import BookShelfSelect from './BookShelfSelect';

const Book = ({ book, onShelfChange }) => {
  const { title, authors, imageLinks } = book;
  const handleShelfChange = (e) => {
    console.log(book, e.target.value);
    onShelfChange(book, e.target.value);
  };
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${imageLinks?.smallThumbnail}")`,
            }}
          ></div>
          <BookShelfSelect
            book={book}
            onChange={handleShelfChange}
            placeholderText="Move to"
          />
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors?.join(', ')}</div>
      </div>
    </li>
  );
};

export default Book;
