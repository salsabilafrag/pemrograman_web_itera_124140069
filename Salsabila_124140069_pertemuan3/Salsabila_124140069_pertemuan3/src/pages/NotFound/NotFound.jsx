import { Link } from 'react-router-dom';

/** Halaman 404 untuk rute yang tidak dikenal */
function NotFound() {
  return (
    <section>
      <h1>404 - Halaman tidak ditemukan</h1>
      <p>Alamat yang kamu buka tidak tersedia.</p>
      <Link to="/" className="btn btn--primary">
        Kembali ke Beranda
      </Link>
    </section>
  );
}

export default NotFound;
