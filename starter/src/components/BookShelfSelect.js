import React from 'react';
import { SHELVES } from '../constants';

const BookShelfSelect = ({ onChange, book, placeholderText }) => {
  return (
    <div className="book-shelf-changer">
      <select onChange={onChange} value={book.shelf}>
        <option value="" disabled>
          {`${placeholderText} ...`}
        </option>
        {Object.values(SHELVES).map((shelf) => (
          <option key={shelf.slug} value={shelf.slug}>
            {shelf.label}
          </option>
        ))}
        <option value="none">None</option>
      </select>
    </div>
  );
};

export default BookShelfSelect;
