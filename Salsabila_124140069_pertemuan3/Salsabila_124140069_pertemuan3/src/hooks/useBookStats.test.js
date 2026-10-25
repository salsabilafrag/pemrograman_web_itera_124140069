import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useBookStats from './useBookStats';

const books = [
  { id: '1', title: 'A', author: 'Tere Liye', status: 'milik' },
  { id: '2', title: 'B', author: 'tere liye', status: 'baca' },
  { id: '3', title: 'C', author: 'Andrea Hirata', status: 'milik' },
  { id: '4', title: 'D', author: 'Pram', status: 'beli' },
];

describe('useBookStats', () => {
  it('menghitung total, jumlah per status, dan persentase', () => {
    const { result } = renderHook(() => useBookStats(books));

    expect(result.current.total).toBe(4);
    expect(result.current.counts).toEqual({ milik: 2, baca: 1, beli: 1 });
    expect(result.current.percentages).toEqual({ milik: 50, baca: 25, beli: 25 });
  });

  it('menghitung penulis unik tanpa membedakan huruf besar/kecil', () => {
    const { result } = renderHook(() => useBookStats(books));
    expect(result.current.uniqueAuthors).toBe(3);
  });

  it('mengembalikan nol semua saat daftar buku kosong', () => {
    const { result } = renderHook(() => useBookStats([]));
    expect(result.current.total).toBe(0);
    expect(result.current.percentages).toEqual({ milik: 0, baca: 0, beli: 0 });
  });
});
