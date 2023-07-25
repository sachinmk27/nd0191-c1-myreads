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

  const handleShelfChange = async (book, shelf) => {
    BooksAPI.update(book, shelf);
    const oldBook = books.find((b) => b.id === book.id);
    console.log(oldBook);
    if (!oldBook) {
      setBooks((books) => [...books, book]);
    }
    setBooks((books) =>
      books.map((b) => {
        if (b.id === book.id) {
          return { ...book, shelf };
        }
        return b;
      })
    );
  };

  const bookShelfMapping = books.reduce((acc, book) => {
    const { shelf, id } = book;
    acc[id] = shelf;
    return acc;
  }, {});

  return { books, bookShelfMapping, handleShelfChange };
}
