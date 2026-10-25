import { useState, useEffect } from 'react';

/**
 * Custom hook #1: state yang otomatis tersimpan di localStorage.
 * - Saat pertama render, nilai dibaca dari localStorage (jika ada).
 * - Setiap nilai berubah, useEffect menyimpannya kembali.
 *
 * @param {string} key          key di localStorage
 * @param {*} initialValue      nilai awal bila belum ada data tersimpan
 * @returns {[*, Function]}     [value, setValue] seperti useState
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      // JSON rusak / localStorage tidak tersedia -> pakai nilai awal
      console.error(`Gagal membaca localStorage "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Gagal menyimpan localStorage "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
