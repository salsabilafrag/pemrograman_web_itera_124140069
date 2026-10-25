import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useLocalStorage from './useLocalStorage';

describe('useLocalStorage', () => {
  it('memakai nilai awal bila localStorage kosong', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', ['a']));
    expect(result.current[0]).toEqual(['a']);
  });

  it('membaca nilai yang sudah tersimpan di localStorage', () => {
    window.localStorage.setItem('test-key', JSON.stringify(['tersimpan']));
    const { result } = renderHook(() => useLocalStorage('test-key', []));
    expect(result.current[0]).toEqual(['tersimpan']);
  });

  it('menyimpan perubahan nilai ke localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 0));

    act(() => {
      result.current[1](42);
    });

    expect(result.current[0]).toBe(42);
    expect(JSON.parse(window.localStorage.getItem('test-key'))).toBe(42);
  });
});
