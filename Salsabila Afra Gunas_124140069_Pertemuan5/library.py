"""
library.py
==========
Berisi class Library yang menyimpan dan mengelola koleksi item perpustakaan.
"""

from library_item import LibraryItem


class Library:
    """
    Perpustakaan: mengelola koleksi LibraryItem.

    Koleksi disimpan di atribut private __koleksi sehingga tidak bisa
    dimodifikasi langsung dari luar class. Semua perubahan harus lewat
    method seperti tambah_item().

    Class ini bekerja dengan tipe abstrak LibraryItem, jadi Book, Magazine,
    maupun subclass baru di masa depan otomatis didukung (polymorphism).
    """

    def __init__(self, nama):
        """Membuat perpustakaan kosong dengan nama tertentu."""
        self._nama = nama
        self.__koleksi = []  # private

    @property
    def nama(self):
        """Nama perpustakaan."""
        return self._nama

    @property
    def jumlah_item(self):
        """Jumlah seluruh item di koleksi."""
        return len(self.__koleksi)

    def tambah_item(self, item):
        """
        Menambahkan item ke koleksi.
        Ditolak jika bukan LibraryItem atau ID sudah terdaftar.
        Return True jika berhasil.
        """
        if not isinstance(item, LibraryItem):
            raise TypeError("Item harus berupa turunan LibraryItem.")
        if self.cari_id(item.item_id) is not None:
            print(f"  ! ID '{item.item_id}' sudah terdaftar, item tidak ditambahkan.")
            return False
        self.__koleksi.append(item)
        print(f"  + Ditambahkan: {item}")
        return True

    def tampilkan_katalog(self, hanya_tersedia=False):
        """
        Menampilkan katalog item.
        hanya_tersedia=True -> hanya item yang tidak sedang dipinjam.
        Setiap item menampilkan detail lewat get_detail() (polymorphism).
        """
        judul = "ITEM TERSEDIA" if hanya_tersedia else "SELURUH KOLEKSI"
        print(f"\n=== KATALOG {self._nama.upper()} - {judul} ===")
        tampil = [i for i in self.__koleksi if not (hanya_tersedia and i.is_dipinjam)]
        if not tampil:
            print("(tidak ada item)")
            return
        for nomor, item in enumerate(tampil, start=1):
            print(f"{nomor}. {item.get_detail()}")

    def cari_judul(self, kata_kunci):
        """
        Mencari item berdasarkan judul (tidak peka huruf besar/kecil,
        cukup memuat kata kunci). Return list item yang cocok.
        """
        kata = kata_kunci.lower()
        return [i for i in self.__koleksi if kata in i.judul.lower()]

    def cari_id(self, item_id):
        """Mencari item berdasarkan ID. Return item, atau None jika tidak ada."""
        for item in self.__koleksi:
            if item.item_id == item_id:
                return item
        return None