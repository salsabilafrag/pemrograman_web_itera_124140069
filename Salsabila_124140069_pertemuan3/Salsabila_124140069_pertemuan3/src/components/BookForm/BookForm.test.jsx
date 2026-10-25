import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import BookForm from './BookForm';

describe('BookForm', () => {
  it('menampilkan pesan error dan tidak submit saat kolom wajib kosong', async () => {
    const onSubmit = vi.fn();
    render(<BookForm onSubmit={onSubmit} />);

    await userEvent.click(screen.getByRole('button', { name: 'Simpan' }));

    expect(screen.getByText('Judul buku wajib diisi')).toBeInTheDocument();
    expect(screen.getByText('Nama penulis wajib diisi')).toBeInTheDocument();
    // Feedback visual: input diberi class error
    expect(screen.getByLabelText('Judul Buku')).toHaveClass('input--error');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('memanggil onSubmit dengan data yang diisi saat form valid', async () => {
    const onSubmit = vi.fn();
    render(<BookForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText('Judul Buku'), 'Bumi');
    await userEvent.type(screen.getByLabelText('Penulis'), 'Tere Liye');
    await userEvent.selectOptions(screen.getByLabelText('Status'), 'baca');
    await userEvent.click(screen.getByRole('button', { name: 'Simpan' }));

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Bumi',
      author: 'Tere Liye',
      status: 'baca',
    });
  });

  it('menghapus pesan error ketika pengguna mulai mengetik', async () => {
    render(<BookForm onSubmit={vi.fn()} />);

    await userEvent.click(screen.getByRole('button', { name: 'Simpan' }));
    expect(screen.getByText('Judul buku wajib diisi')).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText('Judul Buku'), 'A');
    expect(screen.queryByText('Judul buku wajib diisi')).not.toBeInTheDocument();
  });

  it('menolak input yang hanya berisi spasi', async () => {
    const onSubmit = vi.fn();
    render(<BookForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText('Judul Buku'), '   ');
    await userEvent.type(screen.getByLabelText('Penulis'), 'Penulis');
    await userEvent.click(screen.getByRole('button', { name: 'Simpan' }));

    expect(screen.getByText('Judul buku wajib diisi')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
