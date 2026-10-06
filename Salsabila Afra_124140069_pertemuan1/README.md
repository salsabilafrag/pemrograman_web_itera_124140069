# QuickCash – Mini Point of Sale

## 1. Identitas

| Data | Keterangan |
|---|---|
| **Nama Lengkap** | Salsabila Afra |
| **NIM** | 124140069 |
| **Kelas Praktikum** | RB |

---

## 2. Deskripsi Aplikasi

**QuickCash – Mini Point of Sale** merupakan aplikasi web sederhana yang digunakan untuk membantu proses pencatatan barang dan perhitungan transaksi penjualan. Aplikasi ini dibuat sebagai implementasi JavaScript pada studi kasus kasir/mini point of sale.

Pengguna dapat memasukkan nama barang, harga satuan, dan jumlah barang. Data yang valid akan dimasukkan ke dalam tabel keranjang, kemudian aplikasi menghitung total belanja, diskon, total akhir, jumlah pembayaran, dan kembalian secara otomatis.

Aplikasi juga menggunakan **localStorage** agar data keranjang tetap tersimpan pada browser meskipun halaman dimuat ulang.

### Studi Kasus

Studi kasus yang digunakan adalah **sistem kasir sederhana (Mini POS)**. Sistem ini mensimulasikan proses transaksi pada toko atau kantin, mulai dari memasukkan barang sampai menghitung pembayaran pelanggan.

---

## 3. Panduan Menjalankan

### Persyaratan

- Visual Studio Code
- Browser seperti Google Chrome, Microsoft Edge, atau Mozilla Firefox
- Extension **Live Server** pada Visual Studio Code (disarankan)

### Langkah Menjalankan dengan Live Server

1. Ekstrak atau buka folder project **QuickCash** di Visual Studio Code.
2. Pastikan file berikut berada dalam folder utama:
   - `index.html`
   - `style.css`
   - `script.js`
3. Jika belum tersedia, instal extension **Live Server** pada Visual Studio Code.
4. Buka file `index.html`.
5. Klik kanan pada `index.html`.
6. Pilih **Open with Live Server**.
7. Browser akan terbuka secara otomatis pada alamat lokal, misalnya:
   `http://127.0.0.1:5500/index.html`
8. Aplikasi **QuickCash – Mini Point of Sale** siap digunakan.

---

## 4. Daftar Fitur

### Form dan Validasi Input

- [x] Input nama barang
- [x] Validasi nama barang wajib diisi
- [x] Validasi nama barang minimal 3 karakter
- [x] Input harga satuan
- [x] Validasi harga wajib diisi
- [x] Validasi harga minimal Rp500
- [x] Input jumlah barang
- [x] Validasi jumlah wajib diisi
- [x] Validasi jumlah harus berupa bilangan bulat minimal 1
- [x] Pesan error ditampilkan langsung pada form

### Kalkulator Transaksi

- [x] Menambahkan barang ke keranjang
- [x] Menghitung subtotal berdasarkan `harga × jumlah`
- [x] Menghitung total belanja
- [x] Menghitung diskon 10% apabila total belanja minimal Rp50.000
- [x] Menghitung total akhir setelah diskon
- [x] Memasukkan uang pembayaran
- [x] Mengecek kecukupan uang pembayaran
- [x] Menghitung kembalian secara otomatis
- [x] Menghapus barang dari keranjang
- [x] Membuat transaksi baru dengan tombol reset

### localStorage

- [x] Membaca data keranjang dari `localStorage` saat aplikasi dibuka
- [x] Menyimpan data keranjang ke `localStorage`
- [x] Memperbarui `localStorage` ketika barang ditambahkan
- [x] Memperbarui `localStorage` ketika barang dihapus
- [x] Menghapus data `localStorage` ketika transaksi di-reset

---

## 5. Tangkapan Layar (Screenshot)

### 5.1 Tampilan Form Input Utama

Tampilan awal aplikasi berisi form untuk memasukkan nama barang, harga satuan, dan jumlah barang.

 ![Image Alt](https://github.com/salsabilafrag/pemrograman_web_itera_124140069/blob/1645c937bcc575d04c312669ac905e42674833e8/Salsabila%20Afra_124140069_pertemuan1/screenshot/01-form-input.png))

### 5.2 Tampilan Validasi Error

Jika pengguna menekan tombol **Tambahkan Produk** tanpa mengisi data yang diperlukan, aplikasi menampilkan pesan validasi pada masing-masing input.

 ![Image Alt]([screenshots/02-validasi-error.png](https://github.com/salsabilafrag/pemrograman_web_itera_124140069/blob/f9149a0286eb6e7f7c2dab005aadf9c519524cbc/Salsabila%20Afra_124140069_pertemuan1/screenshot/02-validasi-error.png))

### 5.3 Hasil Perhitungan dan Tabel Data Transaksi

Setelah data barang dimasukkan, aplikasi menampilkan tabel keranjang, total belanja, diskon, total akhir, status pembayaran, dan kembalian.

 ![Image Alt]([screenshots/03-hasil-perhitungan.png](https://github.com/salsabilafrag/pemrograman_web_itera_124140069/blob/f9149a0286eb6e7f7c2dab005aadf9c519524cbc/Salsabila%20Afra_124140069_pertemuan1/screenshot/03-hasil-perhitungan.png))

> **Catatan:** Pada implementasi saat ini, tabel yang ditampilkan merupakan **data keranjang/transaksi aktif** yang juga disimpan di `localStorage`, bukan riwayat beberapa transaksi yang terpisah.

---

## 6. Penjelasan Teknis Singkat

### 6.1 Penanganan Validasi Input

Validasi dilakukan ketika form barang disubmit melalui event `submit`. JavaScript mengambil nilai dari input menggunakan `value`, kemudian membersihkan nama barang dengan `trim()` dan mengubah harga serta jumlah menjadi tipe `Number`.

Setiap input diperiksa menggunakan beberapa kondisi:

- Nama barang tidak boleh kosong.
- Nama barang harus memiliki minimal 3 karakter.
- Harga wajib diisi dan minimal Rp500.
- Jumlah wajib diisi, harus berupa bilangan bulat, dan minimal 1.

Jika terdapat input yang tidak valid, variabel `valid` menjadi `false` dan pesan kesalahan ditampilkan pada elemen `<small>` yang sesuai. Data tidak akan dimasukkan ke keranjang sampai seluruh input valid.

### 6.2 Algoritma Kalkulator Keuangan

Perhitungan transaksi dilakukan melalui fungsi `hitungPembayaran()`.

Alurnya adalah:

1. Setiap barang pada array `keranjang` diproses menggunakan `forEach()`.
2. Subtotal setiap barang dihitung dengan rumus:

   **Subtotal = Harga Satuan × Jumlah**

3. Seluruh subtotal dijumlahkan untuk mendapatkan **Total Belanja**.
4. Jika total belanja minimal Rp50.000, diberikan diskon 10%:

   **Diskon = Total Belanja × 10%**

5. Total akhir dihitung dengan:

   **Total Akhir = Total Belanja − Diskon**

6. Ketika pengguna memasukkan uang pembayaran, fungsi `perbaruiKembalian()` membandingkan uang dengan total akhir.
7. Jika uang kurang, sistem menampilkan pesan **"Uang belum mencukupi."**
8. Jika uang cukup, kembalian dihitung dengan:

   **Kembalian = Uang Pembayaran − Total Akhir**

Format angka ditampilkan menggunakan `toLocaleString("id-ID")` agar sesuai dengan format angka Indonesia.

### 6.3 Mekanisme Serialisasi `localStorage`

Data keranjang disimpan dalam bentuk array objek JavaScript:

```javascript
let keranjang = JSON.parse(
    localStorage.getItem("keranjang")
) || [];
```

Saat data perlu disimpan, array `keranjang` diubah menjadi string JSON menggunakan `JSON.stringify()`:

```javascript
localStorage.setItem(
    "keranjang",
    JSON.stringify(keranjang)
);
```

Saat aplikasi dijalankan kembali, string JSON tersebut dikembalikan menjadi array JavaScript menggunakan `JSON.parse()`.

Dengan mekanisme tersebut, data keranjang dapat tetap tersedia setelah halaman browser dimuat ulang. Ketika pengguna memilih **Transaksi Baru**, data keranjang dikosongkan dan key `keranjang` dihapus menggunakan:

```javascript
localStorage.removeItem("keranjang");
```

---

## 7. Struktur File

```text
Salsabila Afra_124140069_pertemuan1/
├── index.html
├── style.css
├── script.js
├── README.md
├── screenshots/
│   ├── 01-form-input.png
│   ├── 02-validasi-error.png
│   └── 03-hasil-perhitungan.png
└── modul/
    ├── index.html
    └── script.js
```

---

## 8. Teknologi yang Digunakan

- **HTML5** – struktur halaman aplikasi
- **CSS3** – tampilan dan responsive layout
- **JavaScript** – validasi, pengolahan data, kalkulasi transaksi, dan interaksi halaman
- **Web Storage API (`localStorage`)** – penyimpanan data keranjang pada browser
- **Visual Studio Code + Live Server** – lingkungan pengembangan dan pengujian aplikasi

---

## 9. Kesimpulan

QuickCash berhasil mengimplementasikan aplikasi kasir sederhana berbasis web dengan validasi input, pengelolaan data keranjang, kalkulasi transaksi, perhitungan kembalian, serta penyimpanan data menggunakan `localStorage`. Aplikasi dapat dijalankan secara lokal melalui Live Server dan dapat digunakan sebagai implementasi dasar JavaScript untuk studi kasus transaksi penjualan.
