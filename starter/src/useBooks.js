import { useEffect, useState } from 'react';
import * as BooksAPI from './BooksAPI';

export default function useBooks() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const getBooks = async () => {
      const books = await BooksAPI.getAll();
      setBooks(books);
    };

    getBooks();
  }, []);

  const bookShelfMapping = books.reduce((acc, book) => {
    const { shelf, id } = book;
    acc[id] = shelf;
    return acc;
  }, {});

  const handleShelfChange = async (book, shelf) => {
    BooksAPI.update(book, shelf);
    setBooks(
      books.map((b) => {
        if (b.id === book.id) {
          return { ...book, shelf };
        }
        return b;
      })
    );
  };

  return { books, bookShelfMapping, handleShelfChange };
}
