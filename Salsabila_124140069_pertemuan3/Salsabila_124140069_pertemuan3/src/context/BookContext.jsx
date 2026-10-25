import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';
import { FILTER_ALL, STORAGE_KEY } from '../utils/constants';

const BookContext = createContext(null);

// Membuat id unik untuk setiap buku
const createId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

/**
 * Provider: menyimpan seluruh state buku (data, filter, pencarian)
 * dan fungsi CRUD, lalu membagikannya lewat Context API.
 */
export function BookProvider({ children }) {
  // Data buku tersimpan permanen di localStorage lewat custom hook
  const [books, setBooks] = useLocalStorage(STORAGE_KEY, []);
  const [statusFilter, setStatusFilter] = useState(FILTER_ALL);
  const [searchQuery, setSearchQuery] = useState('');

  // CREATE
  const addBook = useCallback(
    ({ title, author, status }) => {
      const newBook = {
        id: createId(),
        title: title.trim(),
        author: author.trim(),
        status,
      };
      setBooks((prev) => [newBook, ...prev]);
    },
    [setBooks]
  );

  // UPDATE
  const updateBook = useCallback(
    (id, { title, author, status }) => {
      setBooks((prev) =>
        prev.map((book) =>
          book.id === id
            ? { ...book, title: title.trim(), author: author.trim(), status }
            : book
        )
      );
    },
    [setBooks]
  );

  // DELETE
  const deleteBook = useCallback(
    (id) => {
      setBooks((prev) => prev.filter((book) => book.id !== id));
    },
    [setBooks]
  );

  const getBookById = useCallback(
    (id) => books.find((book) => book.id === id),
    [books]
  );

  // Daftar buku setelah filter status + pencarian judul/penulis diterapkan
  const filteredBooks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return books.filter((book) => {
      const matchStatus = statusFilter === FILTER_ALL || book.status === statusFilter;
      const matchSearch =
        query === '' ||
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query);
      return matchStatus && matchSearch;
    });
  }, [books, statusFilter, searchQuery]);

  const value = useMemo(
    () => ({
      books,
      filteredBooks,
      statusFilter,
      searchQuery,
      setStatusFilter,
      setSearchQuery,
      addBook,
      updateBook,
      deleteBook,
      getBookById,
    }),
    [
      books,
      filteredBooks,
      statusFilter,
      searchQuery,
      addBook,
      updateBook,
      deleteBook,
      getBookById,
    ]
  );

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/** Hook kecil untuk memakai context buku dengan aman */
// eslint-disable-next-line react-refresh/only-export-components
export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks harus dipakai di dalam <BookProvider>');
  }
  return context;
}
