// Konstanta yang dipakai bersama oleh banyak komponen

// Key penyimpanan di localStorage
export const STORAGE_KEY = 'personal-books';

// Daftar status buku (value disimpan di data, label ditampilkan ke pengguna)
export const STATUS_OPTIONS = [
  { value: 'milik', label: 'Dimiliki' },
  { value: 'baca', label: 'Sedang Dibaca' },
  { value: 'beli', label: 'Ingin Dibeli' },
];

// Lookup cepat: { milik: 'Dimiliki', ... }
export const STATUS_LABELS = STATUS_OPTIONS.reduce((acc, opt) => {
  acc[opt.value] = opt.label;
  return acc;
}, {});

// Nilai filter khusus untuk menampilkan semua buku
export const FILTER_ALL = 'semua';
