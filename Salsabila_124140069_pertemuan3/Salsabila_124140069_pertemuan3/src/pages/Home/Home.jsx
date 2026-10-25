import { Link, useNavigate } from 'react-router-dom';
import BookFilter from '../../components/BookFilter/BookFilter';
import BookList from '../../components/BookList/BookList';
import { useBooks } from '../../context/BookContext';
import './Home.css';

/** Halaman utama: pencarian, filter status, dan daftar buku */
function Home() {
  const navigate = useNavigate();
  const {
    books,
    filteredBooks,
    statusFilter,
    searchQuery,
    setStatusFilter,
    setSearchQuery,
    deleteBook,
    getBookById,
  } = useBooks();

  const handleEdit = (id) => navigate(`/edit/${id}`);

  const handleDelete = (id) => {
    const book = getBookById(id);
    // Konfirmasi dulu supaya tidak terhapus tanpa sengaja
    if (window.confirm(`Hapus buku "${book?.title}"?`)) {
      deleteBook(id);
    }
  };

  return (
    <section className="home">
      <div className="home__header">
        <div>
          <h1>Koleksi Buku</h1>
          <p className="home__subtitle">
            Menampilkan {filteredBooks.length} dari {books.length} buku
          </p>
        </div>
        <Link to="/tambah" className="btn btn--primary">
          + Tambah Buku
        </Link>
      </div>

      <BookFilter
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <BookList books={filteredBooks} onEdit={handleEdit} onDelete={handleDelete} />
    </section>
  );
}

export default Home;
