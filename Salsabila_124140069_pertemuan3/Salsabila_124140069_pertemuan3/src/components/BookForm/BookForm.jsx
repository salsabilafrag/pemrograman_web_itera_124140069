import { useState } from 'react';
import PropTypes from 'prop-types';
import { STATUS_OPTIONS } from '../../utils/constants';
import { validateBook } from '../../utils/validateBook';
import './BookForm.css';

const EMPTY_FORM = { title: '', author: '', status: 'milik' };

/**
 * Form tambah / edit buku dengan validasi.
 * Kolom kosong akan diberi border merah + pesan error saat submit.
 */
function BookForm({ initialValues = EMPTY_FORM, onSubmit, onCancel, submitLabel = 'Simpan' }) {
  const [values, setValues] = useState({ ...EMPTY_FORM, ...initialValues });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Hapus pesan error kolom tersebut ketika pengguna mulai mengetik
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateBook(values);
    setErrors(validationErrors);

    // Batalkan submit jika ada error
    if (Object.keys(validationErrors).length > 0) return;

    onSubmit(values);
  };

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="title">Judul Buku</label>
        <input
          id="title"
          name="title"
          type="text"
          className={`input ${errors.title ? 'input--error' : ''}`}
          value={values.title}
          onChange={handleChange}
          placeholder="Contoh: Laskar Pelangi"
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
        {errors.title && (
          <p id="title-error" className="form-error" role="alert">
            {errors.title}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="author">Penulis</label>
        <input
          id="author"
          name="author"
          type="text"
          className={`input ${errors.author ? 'input--error' : ''}`}
          value={values.author}
          onChange={handleChange}
          placeholder="Contoh: Andrea Hirata"
          aria-invalid={Boolean(errors.author)}
          aria-describedby={errors.author ? 'author-error' : undefined}
        />
        {errors.author && (
          <p id="author-error" className="form-error" role="alert">
            {errors.author}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          className={`input ${errors.status ? 'input--error' : ''}`}
          value={values.status}
          onChange={handleChange}
        >
          {STATUS_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {errors.status && (
          <p className="form-error" role="alert">
            {errors.status}
          </p>
        )}
      </div>

      <div className="book-form__actions">
        <button type="submit" className="btn btn--primary">
          {submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="btn btn--outline" onClick={onCancel}>
            Batal
          </button>
        )}
      </div>
    </form>
  );
}

BookForm.propTypes = {
  initialValues: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']),
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  submitLabel: PropTypes.string,
};

export default BookForm;
