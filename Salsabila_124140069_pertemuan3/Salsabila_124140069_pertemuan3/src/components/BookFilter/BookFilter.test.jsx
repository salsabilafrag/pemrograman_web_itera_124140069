import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import BookFilter from './BookFilter';

const setup = (props = {}) => {
  const handlers = { onStatusChange: vi.fn(), onSearchChange: vi.fn() };
  render(
    <BookFilter statusFilter="semua" searchQuery="" {...handlers} {...props} />
  );
  return handlers;
};

describe('BookFilter', () => {
  it('memanggil onStatusChange saat tombol status diklik', async () => {
    const { onStatusChange } = setup();
    await userEvent.click(screen.getByRole('button', { name: 'Sedang Dibaca' }));
    expect(onStatusChange).toHaveBeenCalledWith('baca');
  });

  it('menandai tombol filter yang sedang aktif', () => {
    setup({ statusFilter: 'beli' });
    expect(screen.getByRole('button', { name: 'Ingin Dibeli' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByRole('button', { name: 'Semua' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });

  it('memanggil onSearchChange saat mengetik di kolom pencarian', async () => {
    const { onSearchChange } = setup();
    await userEvent.type(screen.getByLabelText('Cari buku'), 'a');
    expect(onSearchChange).toHaveBeenCalledWith('a');
  });
});
