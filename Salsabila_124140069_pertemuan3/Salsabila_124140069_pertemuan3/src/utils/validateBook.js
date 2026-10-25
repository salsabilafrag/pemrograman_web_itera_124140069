import { STATUS_LABELS } from './constants';

/**
 * Validasi data form buku.
 * @param {{title: string, author: string, status: string}} values
 * @returns {Object} objek error; kosong ({}) jika semua valid
 */
export function validateBook(values) {
  const errors = {};

  if (!values.title || !values.title.trim()) {
    errors.title = 'Judul buku wajib diisi';
  }

  if (!values.author || !values.author.trim()) {
    errors.author = 'Nama penulis wajib diisi';
  }

  if (!values.status || !STATUS_LABELS[values.status]) {
    errors.status = 'Pilih status buku';
  }

  return errors;
}
