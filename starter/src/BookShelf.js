import React from 'react';

const BookShelf = ({ title, children }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">{children}</div>
    </div>
  );
};

export default BookShelf;
