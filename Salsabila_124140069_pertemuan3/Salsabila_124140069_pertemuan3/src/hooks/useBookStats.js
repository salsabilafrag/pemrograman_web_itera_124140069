import { useMemo } from 'react';
import { STATUS_OPTIONS } from '../utils/constants';

/**
 * Custom hook #2: menghitung statistik dari daftar buku.
 * useMemo dipakai agar perhitungan hanya diulang saat `books` berubah.
 *
 * @param {Array} books daftar buku
 * @returns {{total: number, counts: Object, percentages: Object, uniqueAuthors: number}}
 */
export default function useBookStats(books) {
  return useMemo(() => {
    const total = books.length;

    const counts = {};
    const percentages = {};

    STATUS_OPTIONS.forEach(({ value }) => {
      counts[value] = books.filter((book) => book.status === value).length;
      percentages[value] = total === 0 ? 0 : Math.round((counts[value] / total) * 100);
    });

    const uniqueAuthors = new Set(
      books.map((book) => book.author.trim().toLowerCase())
    ).size;

    return { total, counts, percentages, uniqueAuthors };
  }, [books]);
}
