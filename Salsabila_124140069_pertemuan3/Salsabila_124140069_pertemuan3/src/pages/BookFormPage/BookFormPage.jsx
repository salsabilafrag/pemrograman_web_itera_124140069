import { Link, useNavigate, useParams } from 'react-router-dom';
import BookForm from '../../components/BookForm/BookForm';
import { useBooks } from '../../context/BookContext';
import './BookFormPage.css';

/**
 * Halaman tambah (/tambah) dan edit (/edit/:id).
 * Mode ditentukan dari ada/tidaknya parameter :id di URL.
 */
function BookFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addBook, updateBook, getBookById } = useBooks();

  const isEdit = Boolean(id);
  const existingBook = isEdit ? getBookById(id) : undefined;

  // ID di URL tidak ditemukan di data
  if (isEdit && !existingBook) {
    return (
      <section className="form-page">
        <h1>Buku tidak ditemukan</h1>
        <p>Buku yang ingin diedit mungkin sudah dihapus.</p>
        <Link to="/" className="btn btn--primary">
          Kembali ke Beranda
        </Link>
      </section>
    );
  }

  const handleSubmit = (values) => {
    if (isEdit) {
      updateBook(id, values);
    } else {
      addBook(values);
    }
    navigate('/');
  };

  return (
    <section className="form-page">
      <h1>{isEdit ? 'Edit Buku' : 'Tambah Buku Baru'}</h1>
      <BookForm
        initialValues={
          existingBook && {
            title: existingBook.title,
            author: existingBook.author,
            status: existingBook.status,
          }
        }
        onSubmit={handleSubmit}
        onCancel={() => navigate('/')}
        submitLabel={isEdit ? 'Simpan Perubahan' : 'Tambah Buku'}
      />
    </section>
  );
}

export default BookFormPage;
