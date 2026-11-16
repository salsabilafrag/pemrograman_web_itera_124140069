"""
main.py
=======
Skrip untuk menguji seluruh fungsionalitas sistem perpustakaan.
Jalankan dengan:  python main.py
"""

from library_item import LibraryItem, Book, Magazine
from library import Library
from member import Member


def garis(judul):
    """Mencetak pemisah bagian agar output mudah dibaca."""
    print(f"\n{'#' * 60}\n# {judul}\n{'#' * 60}")


def main():
    perpus = Library("Perpustakaan ITERA")

    # 1. Menambahkan item ------------------------------------------------
    garis("1. MENAMBAHKAN ITEM")
    perpus.tambah_item(Book("B001", "Pemrograman Python Dasar", 2021,
                            "Cantika", "Informatika", 320))
    perpus.tambah_item(Book("B002", "Struktur Data dan Algoritma", 2019,
                            "Elsa", "Erlangga", 450))
    perpus.tambah_item(Book("B003", "Basis Data Lanjut", 2020,
                            "Ana", "Kata Depan", 380))
    perpus.tambah_item(Magazine("M001", "Tech Today", 2026, "Vol. 12 No. 3", "Media Digital"))
    perpus.tambah_item(Magazine("M002", "Sains Populer", 2026, "Edisi November", "Kreasi Ilmu"))
    print("\nMencoba menambah ID duplikat:")
    perpus.tambah_item(Book("B001", "Buku Duplikat", 2022, "Anonim", "-", 100))
    print(f"\nTotal koleksi: {perpus.jumlah_item} item")

    # 2. Katalog ---------------------------------------------------------
    garis("2. MENAMPILKAN KATALOG")
    perpus.tampilkan_katalog()

    # 3. Pencarian -------------------------------------------------------
    garis("3. PENCARIAN ITEM")
    print("Cari judul 'python':")
    for item in perpus.cari_judul("python"):
        print(f"  ditemukan -> {item}")

    print("Cari judul 'data':")
    for item in perpus.cari_judul("data"):
        print(f"  ditemukan -> {item}")

    print("Cari ID 'M001':")
    hasil = perpus.cari_id("M001")
    print(f"  ditemukan -> {hasil}" if hasil else "  tidak ditemukan")

    print("Cari ID 'X999':")
    hasil = perpus.cari_id("X999")
    print(f"  ditemukan -> {hasil}" if hasil else "  tidak ditemukan")

    # 4. Status ketersediaan --------------------------------------------
    garis("4. PEMINJAMAN & STATUS KETERSEDIAAN")
    anggota = Member("A001", "Salsabila")
    teman = Member("A002", "Rina")

    buku = perpus.cari_id("B001")
    majalah = perpus.cari_id("M001")

    print(anggota.pinjam_item(buku))
    print(anggota.pinjam_item(majalah))
    print(teman.pinjam_item(buku))  # sudah dipinjam -> gagal
    print(f"\nis_dipinjam '{buku.judul}': {buku.is_dipinjam}")
    print(f"is_dipinjam '{majalah.judul}': {majalah.is_dipinjam}")

    perpus.tampilkan_katalog(hanya_tersedia=True)

    # 5. Polymorphism: denda ---------------------------------------------
    garis("5. POLYMORPHISM - HITUNG DENDA (terlambat 5 hari)")
    daftar = [buku, majalah]
    for item in daftar:
        # Pemanggilan sama, hasil berbeda tergantung jenis item
        print(f"{item.__class__.__name__:<9} durasi {item.durasi_pinjam:>2} hari | "
              f"denda Rp{item.hitung_denda(5):,}".replace(",", "."))

    print()
    print(anggota.kembalikan_item(buku, hari_terlambat=5))
    print(anggota.kembalikan_item(majalah, hari_terlambat=0))

    perpus.tampilkan_katalog(hanya_tersedia=True)

    # 6. Encapsulation ---------------------------------------------------
    garis("6. ENCAPSULATION")
    try:
        buku.is_dipinjam = True  # property read-only
    except AttributeError as e:
        print(f"Ubah is_dipinjam langsung ditolak : {e}")
    try:
        print(buku.__dipinjam)  # atribut private (name mangling)
    except AttributeError:
        print("Akses atribut private __dipinjam ditolak (AttributeError)")
    try:
        buku.judul = "   "  # setter dengan validasi
    except ValueError as e:
        print(f"Setter judul menolak nilai kosong : {e}")
    try:
        LibraryItem("X", "Abstrak", 2026)  # abstract class
    except TypeError as e:
        print(f"Instansiasi abstract class ditolak: {e}")


if __name__ == "__main__":
    main()