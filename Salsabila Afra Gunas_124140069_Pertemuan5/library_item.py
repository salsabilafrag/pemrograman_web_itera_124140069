"""
library_item.py
===============
Berisi abstract class LibraryItem beserta subclass-nya (Book dan Magazine).

Konsep OOP yang diterapkan di modul ini:
- Abstract class  : LibraryItem(ABC) dengan abstract method & abstract property
- Inheritance     : Book dan Magazine mewarisi LibraryItem
- Encapsulation   : atribut protected (_) dan private (__), diakses lewat property
- Polymorphism    : get_detail(), hitung_denda(), dan durasi_pinjam berperilaku
                    berbeda pada tiap subclass
"""

from abc import ABC, abstractmethod


class LibraryItem(ABC):
    """
    Abstract class yang menjadi dasar semua item di perpustakaan.

    Class ini tidak bisa diinstansiasi langsung. Setiap subclass WAJIB
    mengimplementasikan get_detail(), hitung_denda(), dan durasi_pinjam.

    Atribut:
        _item_id      (protected): ID unik item
        _judul        (protected): judul item
        _tahun_terbit (protected): tahun terbit item
        __dipinjam    (private)  : status peminjaman, hanya bisa diubah lewat
                                   method pinjam() dan kembalikan()
    """

    def __init__(self, item_id, judul, tahun_terbit):
        """Membuat item perpustakaan baru yang berstatus tersedia."""
        self._item_id = item_id
        self._judul = judul
        self._tahun_terbit = tahun_terbit
        self.__dipinjam = False  # private: tidak bisa diubah langsung dari luar

    # ------------------------------------------------------------------
    # Property (getter / setter)
    # ------------------------------------------------------------------
    @property
    def item_id(self):
        """ID item (read-only, tidak boleh diubah setelah dibuat)."""
        return self._item_id

    @property
    def judul(self):
        """Judul item."""
        return self._judul

    @judul.setter
    def judul(self, nilai):
        """Mengubah judul dengan validasi: tidak boleh kosong."""
        if not nilai or not nilai.strip():
            raise ValueError("Judul tidak boleh kosong.")
        self._judul = nilai.strip()

    @property
    def tahun_terbit(self):
        """Tahun terbit item."""
        return self._tahun_terbit

    @property
    def is_dipinjam(self):
        """
        Status peminjaman (read-only).
        True jika sedang dipinjam. Tidak ada setter, sehingga status hanya
        bisa berubah melalui pinjam() dan kembalikan().
        """
        return self.__dipinjam

    @property
    def status(self):
        """Status dalam bentuk teks: 'Dipinjam' atau 'Tersedia'."""
        return "Dipinjam" if self.__dipinjam else "Tersedia"

    # ------------------------------------------------------------------
    # Method konkret (dipakai bersama oleh semua subclass)
    # ------------------------------------------------------------------
    def pinjam(self):
        """
        Meminjam item.
        Return True jika berhasil, False jika item sedang dipinjam.
        """
        if self.__dipinjam:
            return False
        self.__dipinjam = True
        return True

    def kembalikan(self):
        """
        Mengembalikan item.
        Return True jika berhasil, False jika item memang tidak sedang dipinjam.
        """
        if not self.__dipinjam:
            return False
        self.__dipinjam = False
        return True

    def __str__(self):
        """Representasi singkat item: [ID] Judul (Jenis) - Status."""
        return f"[{self._item_id}] {self._judul} ({self.__class__.__name__}) - {self.status}"

    # ------------------------------------------------------------------
    # Abstract method / property (WAJIB diimplementasikan subclass)
    # ------------------------------------------------------------------
    @abstractmethod
    def get_detail(self):
        """Mengembalikan string detail lengkap item sesuai jenisnya."""

    @abstractmethod
    def hitung_denda(self, hari_terlambat):
        """Menghitung denda (Rupiah) berdasarkan jumlah hari keterlambatan."""

    @property
    @abstractmethod
    def durasi_pinjam(self):
        """Lama peminjaman maksimal (dalam hari)."""


class Book(LibraryItem):
    """
    Subclass untuk buku.
    Denda Rp1.000/hari, durasi peminjaman 14 hari.
    """

    DENDA_PER_HARI = 1000

    def __init__(self, item_id, judul, tahun_terbit, penulis, penerbit, jumlah_halaman):
        """Membuat buku baru. Atribut umum diteruskan ke parent via super()."""
        super().__init__(item_id, judul, tahun_terbit)
        self._penulis = penulis
        self._penerbit = penerbit
        self._jumlah_halaman = jumlah_halaman

    @property
    def penulis(self):
        """Nama penulis buku (read-only)."""
        return self._penulis

    def get_detail(self):
        """Implementasi abstract method: detail khusus buku."""
        return (
            f"[BUKU] {self._judul}\n"
            f"       ID        : {self._item_id}\n"
            f"       Penulis   : {self._penulis}\n"
            f"       Penerbit  : {self._penerbit} ({self._tahun_terbit})\n"
            f"       Halaman   : {self._jumlah_halaman}\n"
            f"       Status    : {self.status}"
        )

    def hitung_denda(self, hari_terlambat):
        """Implementasi abstract method: Rp1.000 per hari keterlambatan."""
        return max(0, hari_terlambat) * self.DENDA_PER_HARI

    @property
    def durasi_pinjam(self):
        """Buku boleh dipinjam selama 14 hari."""
        return 14


class Magazine(LibraryItem):
    """
    Subclass untuk majalah.
    Denda Rp500/hari, durasi peminjaman 7 hari.
    """

    DENDA_PER_HARI = 500

    def __init__(self, item_id, judul, tahun_terbit, edisi, penerbit):
        """Membuat majalah baru. 'edisi' contoh: 'Vol. 12 No. 3'."""
        super().__init__(item_id, judul, tahun_terbit)
        self._edisi = edisi
        self._penerbit = penerbit

    @property
    def edisi(self):
        """Edisi majalah (read-only)."""
        return self._edisi

    def get_detail(self):
        """Implementasi abstract method: detail khusus majalah."""
        return (
            f"[MAJALAH] {self._judul}\n"
            f"          ID        : {self._item_id}\n"
            f"          Edisi     : {self._edisi}\n"
            f"          Penerbit  : {self._penerbit} ({self._tahun_terbit})\n"
            f"          Status    : {self.status}"
        )

    def hitung_denda(self, hari_terlambat):
        """Implementasi abstract method: Rp500 per hari keterlambatan."""
        return max(0, hari_terlambat) * self.DENDA_PER_HARI

    @property
    def durasi_pinjam(self):
        """Majalah boleh dipinjam selama 7 hari."""
        return 7