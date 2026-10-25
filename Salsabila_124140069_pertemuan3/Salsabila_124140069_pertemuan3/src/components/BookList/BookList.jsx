import PropTypes from 'prop-types';
import BookItem from '../BookItem/BookItem';
import { bookShape } from '../../utils/propTypes';
import './BookList.css';

/** Menampilkan daftar buku, atau pesan kosong bila tidak ada hasil */
function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return (
      <div className="book-list__empty" role="status">
        <p>Belum ada buku yang cocok.</p>
        <p className="book-list__hint">
          Tambahkan buku baru atau ubah filter / kata kunci pencarian.
        </p>
      </div>
    );
  }

  return (
    <ul className="book-list">
      {books.map((book) => (
        <BookItem key={book.id} book={book} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(bookShape).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookList;
