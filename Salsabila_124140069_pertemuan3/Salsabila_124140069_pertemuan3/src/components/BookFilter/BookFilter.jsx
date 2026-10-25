import PropTypes from 'prop-types';
import { FILTER_ALL, STATUS_OPTIONS } from '../../utils/constants';
import './BookFilter.css';

const FILTER_OPTIONS = [{ value: FILTER_ALL, label: 'Semua' }, ...STATUS_OPTIONS];

/** Kolom pencarian (judul/penulis) + tombol filter status */
function BookFilter({ statusFilter, onStatusChange, searchQuery, onSearchChange }) {
  return (
    <div className="book-filter">
      <div className="book-filter__search">
        <label htmlFor="search-book" className="book-filter__label">
          Cari buku
        </label>
        <input
          id="search-book"
          type="search"
          className="input"
          placeholder="Cari judul atau nama penulis..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="book-filter__status" role="group" aria-label="Filter status buku">
        {FILTER_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={`book-filter__btn ${statusFilter === value ? 'active' : ''}`}
            aria-pressed={statusFilter === value}
            onClick={() => onStatusChange(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

BookFilter.propTypes = {
  statusFilter: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default BookFilter;
