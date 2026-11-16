# Tugas Praktikum Pertemuan 5 — Sistem Manajemen Perpustakaan Sederhana

## Identitas Mahasiswa

| | |
|---|---|
| **Nama Lengkap** | Salsabila Afra Gunas |
| **NIM** | 124140069 |
| **Kelas Praktikum** | RB |

## Deskripsi Program

Program ini adalah sistem perpustakaan berbasis OOP Python yang dapat menambahkan item, menampilkan katalog, mencari item berdasarkan judul atau ID, serta mengelola status peminjaman dan denda.

### Alur Program

1. `main.py` membuat objek `Library` dan menambahkan beberapa `Book` dan `Magazine`.
2. Katalog ditampilkan; setiap item mencetak detailnya sendiri.
3. Item dicari berdasarkan judul (`cari_judul`) atau ID (`cari_id`).
4. `Member` meminjam item, sehingga status berubah menjadi *Dipinjam*. Katalog "tersedia" otomatis menyembunyikan item tersebut.
5. Item dikembalikan dan denda keterlambatan dihitung.
6. Bagian akhir mendemonstrasikan perlindungan data (encapsulation).

### Struktur Berkas

```
Salsabila Afra Gunas_124140069_pertemuan5/
├── latihan/                  # latihan konsep OOP (01–06)
├── tugas_perpustakaan/
│   ├── library_item.py       # LibraryItem (ABC), Book, Magazine
│   ├── member.py             # Member
│   ├── library.py            # Library
│   └── main.py               # skrip pengujian
├── README.md
└── .gitignore
```

### Penerapan 4 Pilar OOP

**1. Class & Object**
`Library`, `Member`, `Book`, dan `Magazine` memodelkan entitas nyata perpustakaan. Tiap objek memiliki atribut (data) dan method (perilaku) sendiri.

**2. Inheritance (Pewarisan) & Abstract Class**
`LibraryItem(ABC)` adalah abstract class yang tidak dapat diinstansiasi. `Book` dan `Magazine` mewarisinya sehingga memakai ulang atribut (`item_id`, `judul`, `tahun_terbit`) dan method `pinjam()` / `kembalikan()`. Keduanya wajib mengimplementasikan abstract method `get_detail()`, `hitung_denda()`, dan abstract property `durasi_pinjam`.

**3. Encapsulation**
- Atribut **protected**: `_item_id`, `_judul`, `_tahun_terbit`, `_penulis`, dst.
- Atribut **private**: `__dipinjam` (status pinjam item), `__koleksi` (koleksi di `Library`), `__daftar_pinjam` (pinjaman di `Member`). Perubahannya hanya lewat method resmi seperti `pinjam()`, `kembalikan()`, dan `tambah_item()`.
- **Property decorator**: `is_dipinjam` (read-only), `judul` (getter + setter dengan validasi), `item_id`, `status`, `durasi_pinjam`, dan `jumlah_item`.

**4. Polymorphism**
Method yang sama menghasilkan perilaku berbeda tergantung jenis objek:

| Method | `Book` | `Magazine` |
|---|---|---|
| `hitung_denda(hari)` | Rp1.000 / hari | Rp500 / hari |
| `durasi_pinjam` | 14 hari | 7 hari |
| `get_detail()` | Memuat penulis & halaman | Memuat edisi |

`Library.tampilkan_katalog()` cukup memanggil `item.get_detail()` tanpa perlu tahu apakah itemnya buku atau majalah.

## Panduan Menjalankan Program

Prasyarat: Python 3.8 atau lebih baru (tanpa library tambahan).

```bash
cd "Salsabila Afra Gunas_124140069_pertemuan5/tugas_perpustakaan"
python main.py
```

Pada sebagian sistem (Linux/macOS) gunakan `python3 main.py`.

Latihan dapat dijalankan dengan cara serupa, misalnya `python latihan/03_inheritance.py`.

## Screenshot Output

> **Catatan:** simpan tangkapan layar terminal ke folder `screenshots/` lalu ganti placeholder di bawah. Pastikan terlihat bagian penambahan item, katalog, pencarian, dan status ketersediaan.

![Penambahan item dan katalog](Screenshoot/Gambar%201.png)

![Pencarian dan status ketersediaan](Screenshoot/Gambar%203.png)

### Cuplikan Output Teks

```
# 1. MENAMBAHKAN ITEM
  + Ditambahkan: [B001] Pemrograman Python Dasar (Book) - Tersedia
  + Ditambahkan: [M001] Tech Today (Magazine) - Tersedia
  ! ID 'B001' sudah terdaftar, item tidak ditambahkan.

# 3. PENCARIAN ITEM
Cari judul 'python':
  ditemukan -> [B001] Pemrograman Python Dasar (Book) - Tersedia
Cari ID 'X999':
  tidak ditemukan

# 4. PEMINJAMAN & STATUS KETERSEDIAAN
BERHASIL: Salsabila meminjam 'Pemrograman Python Dasar' (maks. 14 hari).
GAGAL: 'Pemrograman Python Dasar' sedang dipinjam orang lain.

# 5. POLYMORPHISM - HITUNG DENDA (terlambat 5 hari)
Book      durasi 14 hari | denda Rp5.000
Magazine  durasi  7 hari | denda Rp2.500
```