import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import App from './App';
import { BookProvider } from './context/BookContext';
import { STORAGE_KEY } from './utils/constants';

const seed = [
  { id: '1', title: 'Bumi', author: 'Tere Liye', status: 'milik' },
  { id: '2', title: 'Laskar Pelangi', author: 'Andrea Hirata', status: 'baca' },
  { id: '3', title: 'Bumi Manusia', author: 'Pramoedya', status: 'beli' },
];

// Render seluruh aplikasi pada rute tertentu, dengan data awal opsional
function renderApp(route = '/', books = seed) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  return render(
    <MemoryRouter initialEntries={[route]}>
      <BookProvider>
        <App />
      </BookProvider>
    </MemoryRouter>
  );
}

describe('Aplikasi manajemen buku (integrasi)', () => {
  it('mencari buku berdasarkan judul atau nama penulis', async () => {
    renderApp();

    await userEvent.type(screen.getByLabelText('Cari buku'), 'hirata');
    expect(screen.getByText('Laskar Pelangi')).toBeInTheDocument();
    expect(screen.queryByText('Bumi')).not.toBeInTheDocument();

    await userEvent.clear(screen.getByLabelText('Cari buku'));
    await userEvent.type(screen.getByLabelText('Cari buku'), 'bumi');
    expect(screen.getByText('Bumi')).toBeInTheDocument();
    expect(screen.getByText('Bumi Manusia')).toBeInTheDocument();
    expect(screen.queryByText('Laskar Pelangi')).not.toBeInTheDocument();
  });

  it('memfilter buku berdasarkan status', async () => {
    renderApp();

    await userEvent.click(screen.getByRole('button', { name: 'Ingin Dibeli' }));

    expect(screen.getByText('Bumi Manusia')).toBeInTheDocument();
    expect(screen.queryByText('Laskar Pelangi')).not.toBeInTheDocument();
  });

  it('menambah buku baru dan menyimpannya ke localStorage', async () => {
    renderApp('/tambah', []);

    await userEvent.type(screen.getByLabelText('Judul Buku'), 'Negeri 5 Menara');
    await userEvent.type(screen.getByLabelText('Penulis'), 'A. Fuadi');
    await userEvent.click(screen.getByRole('button', { name: 'Tambah Buku' }));

    // Setelah submit, pengguna diarahkan ke Beranda dan buku muncul
    expect(await screen.findByText('Negeri 5 Menara')).toBeInTheDocument();

    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    expect(saved).toHaveLength(1);
    expect(saved[0]).toMatchObject({ title: 'Negeri 5 Menara', author: 'A. Fuadi' });
  });

  it('mengedit buku yang sudah ada', async () => {
    renderApp('/edit/1');

    const titleInput = screen.getByLabelText('Judul Buku');
    expect(titleInput).toHaveValue('Bumi');

    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, 'Bulan');
    await userEvent.click(screen.getByRole('button', { name: 'Simpan Perubahan' }));

    expect(await screen.findByText('Bulan')).toBeInTheDocument();
    // Judul lama "Bumi" (kecocokan penuh) sudah tidak ada; "Bumi Manusia" tetap ada
    expect(screen.queryByText('Bumi')).not.toBeInTheDocument();
    expect(screen.getByText('Bumi Manusia')).toBeInTheDocument();
  });

  it('menghapus buku setelah konfirmasi', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    renderApp();

    await userEvent.click(screen.getByRole('button', { name: 'Hapus Laskar Pelangi' }));

    expect(screen.queryByText('Laskar Pelangi')).not.toBeInTheDocument();
    expect(JSON.parse(window.localStorage.getItem(STORAGE_KEY))).toHaveLength(2);
  });

  it('tidak menghapus buku bila konfirmasi dibatalkan', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    renderApp();

    await userEvent.click(screen.getByRole('button', { name: 'Hapus Laskar Pelangi' }));

    expect(screen.getByText('Laskar Pelangi')).toBeInTheDocument();
  });

  it('menampilkan statistik di halaman Statistik via navigasi', async () => {
    renderApp();

    const nav = screen.getByRole('navigation', { name: 'Navigasi utama' });
    await userEvent.click(within(nav).getByRole('link', { name: 'Statistik' }));

    expect(screen.getByTestId('stat-total')).toHaveTextContent('3');
    expect(screen.getByTestId('stat-authors')).toHaveTextContent('3');
  });
});
