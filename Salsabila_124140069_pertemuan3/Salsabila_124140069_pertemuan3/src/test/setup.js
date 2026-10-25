import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Bersihkan localStorage sebelum tiap test agar test saling independen
beforeEach(() => {
  window.localStorage.clear();
});

// Bersihkan DOM dan kembalikan semua mock (mis. window.confirm) setelah tiap test
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
