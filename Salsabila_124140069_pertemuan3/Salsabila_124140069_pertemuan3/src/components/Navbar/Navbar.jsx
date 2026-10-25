import { NavLink } from 'react-router-dom';
import './Navbar.css';

/** Komponen reusable #2: navigasi antar halaman (React Router) */
function Navbar() {
  const linkClass = ({ isActive }) => (isActive ? 'navbar__link active' : 'navbar__link');

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <span className="navbar__brand">📚 Buku Saya</span>
        <nav className="navbar__nav" aria-label="Navigasi utama">
          <NavLink to="/" end className={linkClass}>
            Beranda
          </NavLink>
          <NavLink to="/tambah" className={linkClass}>
            Tambah Buku
          </NavLink>
          <NavLink to="/statistik" className={linkClass}>
            Statistik
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
