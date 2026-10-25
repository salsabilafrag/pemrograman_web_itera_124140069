import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';
import BookFormPage from './pages/BookFormPage/BookFormPage';
import NotFound from './pages/NotFound/NotFound';
import './App.css';

/** Definisi rute aplikasi (React Router v6) */
function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tambah" element={<BookFormPage />} />
          <Route path="/edit/:id" element={<BookFormPage />} />
          <Route path="/statistik" element={<Stats />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
