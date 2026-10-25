import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import BookList from './BookList';

const books = [
  { id: '1', title: 'Bumi', author: 'Tere Liye', status: 'milik' },
  { id: '2', title: 'Laskar Pelangi', author: 'Andrea Hirata', status: 'baca' },
];

describe('BookList', () => {
  it('menampilkan semua buku beserta penulis dan status', () => {
    render(<BookList books={books} onEdit={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText('Bumi')).toBeInTheDocument();
    expect(screen.getByText('oleh Andrea Hirata')).toBeInTheDocument();
    expect(screen.getByText('Dimiliki')).toBeInTheDocument();
    expect(screen.getByText('Sedang Dibaca')).toBeInTheDocument();
  });

  it('menampilkan pesan kosong bila tidak ada buku', () => {
    render(<BookList books={[]} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Belum ada buku yang cocok.')).toBeInTheDocument();
  });

  it('memanggil onEdit dan onDelete dengan id buku yang benar', async () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    render(<BookList books={books} onEdit={onEdit} onDelete={onDelete} />);

    await userEvent.click(screen.getByRole('button', { name: 'Edit Laskar Pelangi' }));
    await userEvent.click(screen.getByRole('button', { name: 'Hapus Bumi' }));

    expect(onEdit).toHaveBeenCalledWith('2');
    expect(onDelete).toHaveBeenCalledWith('1');
  });
});
