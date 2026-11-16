"""
member.py
=========
Berisi class Member: anggota perpustakaan yang dapat meminjam dan
mengembalikan item (Book maupun Magazine).
"""

from library_item import LibraryItem


class Member:
    """
    Anggota perpustakaan.

    Atribut:
        _member_id     (protected): ID anggota
        _nama          (protected): nama anggota
        __daftar_pinjam (private) : item yang sedang dipinjam anggota
    """

    MAKS_PINJAM = 3  # batas jumlah item yang boleh dipinjam bersamaan

    def __init__(self, member_id, nama):
        """Membuat anggota baru tanpa pinjaman."""
        self._member_id = member_id
        self._nama = nama
        self.__daftar_pinjam = []

    @property
    def member_id(self):
        """ID anggota (read-only)."""
        return self._member_id

    @property
    def nama(self):
        """Nama anggota (read-only)."""
        return self._nama

    @property
    def daftar_pinjam(self):
        """Salinan daftar item yang dipinjam (list asli tetap terlindungi)."""
        return list(self.__daftar_pinjam)

    def pinjam_item(self, item):
        """
        Meminjam sebuah item.
        Return pesan hasil proses (berhasil / alasan gagal).
        """
        if not isinstance(item, LibraryItem):
            raise TypeError("Hanya LibraryItem yang dapat dipinjam.")
        if len(self.__daftar_pinjam) >= self.MAKS_PINJAM:
            return f"GAGAL: {self._nama} sudah mencapai batas {self.MAKS_PINJAM} pinjaman."
        if not item.pinjam():
            return f"GAGAL: '{item.judul}' sedang dipinjam orang lain."
        self.__daftar_pinjam.append(item)
        return (
            f"BERHASIL: {self._nama} meminjam '{item.judul}' "
            f"(maks. {item.durasi_pinjam} hari)."
        )

    def kembalikan_item(self, item, hari_terlambat=0):
        """
        Mengembalikan item. Denda dihitung secara polimorfik lewat
        item.hitung_denda(): hasilnya berbeda untuk Book dan Magazine.
        """
        if item not in self.__daftar_pinjam:
            return f"GAGAL: {self._nama} tidak meminjam '{item.judul}'."
        item.kembalikan()
        self.__daftar_pinjam.remove(item)
        denda = item.hitung_denda(hari_terlambat)
        pesan = f"BERHASIL: {self._nama} mengembalikan '{item.judul}'."
        if denda > 0:
            denda_rupiah = f"{denda:,}".replace(",", ".")
            pesan += f" Terlambat {hari_terlambat} hari, denda Rp{denda_rupiah}."
        return pesan

    def __str__(self):
        """Representasi singkat anggota."""
        return f"{self._nama} ({self._member_id}) - {len(self.__daftar_pinjam)} pinjaman"