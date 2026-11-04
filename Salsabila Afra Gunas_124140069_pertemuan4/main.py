"""Program utama: menggunakan modul math_operations."""

import math_operations
from math_operations import (
    luas_persegi_panjang,
    keliling_persegi_panjang,
    celsius_ke_fahrenheit,
    celsius_ke_kelvin,
)
from math_operations import luas_lingkaran as luas_bulat


def garis(judul):
    """Mencetak judul bagian dengan pembatas.

    Parameter:
        judul (str): Judul bagian.

    Mengembalikan:
        None
    """
    print(f"\n=== {judul} ===")


def main():
    """Fungsi utama: memanggil seluruh fungsi pada modul dengan data uji."""
    print(f"Konstanta PI = {math_operations.PI}")

    garis("PERSEGI (import math_operations)")
    for sisi in (4, 7.5, 10):
        luas = math_operations.luas_persegi(sisi)
        keliling = math_operations.keliling_persegi(sisi)
        print(f"Sisi {sisi:>5}: luas = {luas:>8.2f}, "
              f"keliling = {keliling:>8.2f}")

    garis("PERSEGI PANJANG (from ... import ...)")
    for p, l in ((5, 3), (10, 4.5), (12, 8)):
        luas = luas_persegi_panjang(p, l)
        keliling = keliling_persegi_panjang(p, l)
        print(f"P={p:>4}, L={l:>4}: luas = {luas:>8.2f}, "
              f"keliling = {keliling:>8.2f}")

    garis("LINGKARAN (from ... import ... as ...)")
    for r in (3, 7, 14):
        luas = luas_bulat(r)
        keliling = math_operations.keliling_lingkaran(r)
        print(f"r = {r:>3}: luas = {luas:>8.2f}, keliling = {keliling:>8.2f}")

    garis("KONVERSI SUHU")
    for c in (0, 37, 100, -40):
        f = celsius_ke_fahrenheit(c)
        k = celsius_ke_kelvin(c)
        print(f"{c:>5} C = {f:>7.2f} F = {k:>7.2f} K")


if __name__ == "__main__":
    main()
