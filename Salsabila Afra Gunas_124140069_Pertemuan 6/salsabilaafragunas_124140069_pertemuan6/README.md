# RESTful API Manajemen Mahasiswa dan Matakuliah (Pyramid + PostgreSQL)

## Identitas Praktikan

| | |
|---|---|
| **Nama Lengkap** | Salsabila Afra Gunas |
| **NIM** | 124140069 |
| **Kelas Praktikum** | RB |
| **Mata Kuliah** | Pemrograman Web - Pertemuan 6 |

## Deskripsi Aplikasi

Aplikasi RESTful API berbasis **Pyramid** untuk mengelola data **Mahasiswa**
dan **Matakuliah** dengan database **PostgreSQL**. Aplikasi menerapkan:

- **Model data ORM** (SQLAlchemy) dengan method `to_dict()` untuk serialisasi JSON.
- **Migrasi database** menggunakan **Alembic**.
- **Routing URL Dispatch** dengan predikat `request_method`.
- **View controller CRUD** yang mengembalikan JSON beserta status code yang tepat.

### Daftar Endpoint

| Method | URL | Keterangan | Status Code |
|---|---|---|---|
| GET | `/api/matakuliah` | Daftar seluruh mata kuliah | 200 |
| GET | `/api/matakuliah/{id}` | Detail mata kuliah | 200, 404 |
| POST | `/api/matakuliah` | Tambah mata kuliah | 201, 400 |
| PUT | `/api/matakuliah/{id}` | Perbarui mata kuliah | 200, 400, 404 |
| DELETE | `/api/matakuliah/{id}` | Hapus mata kuliah | 200, 404 |
| GET | `/api/mahasiswa` | Daftar seluruh mahasiswa | 200 |
| GET | `/api/mahasiswa/{id}` | Detail mahasiswa | 200, 404 |
| POST | `/api/mahasiswa` | Tambah mahasiswa | 201, 400 |
| PUT | `/api/mahasiswa/{id}` | Perbarui mahasiswa | 200, 400, 404 |
| DELETE | `/api/mahasiswa/{id}` | Hapus mahasiswa | 200, 404 |

**Validasi Matakuliah:** `kode_mk`, `nama_mk`, `sks`, `semester` wajib diisi.
`sks` dan `semester` harus bilangan bulat **lebih dari 0**. `kode_mk` harus unik
(disimpan dalam huruf kapital). Pelanggaran validasi menghasilkan status **400**.

## Struktur Proyek

```text
salsabilaafragunas_124140069_pertemuan6/
├── alembic.ini
├── development.ini
├── production.ini
├── setup.py
├── README.md
├── .gitignore
└── pyramid_mahasiswa/
    ├── __init__.py
    ├── routes.py
    ├── alembic/
    │   ├── env.py
    │   └── versions/
    │       ├── 20261112_create_mahasiswa_table.py
    │       └── 20261112_create_matakuliah_table.py
    ├── models/
    │   ├── __init__.py
    │   ├── meta.py
    │   ├── mahasiswa.py
    │   └── matakuliah.py
    ├── scripts/
    │   ├── __init__.py
    │   └── initialize_db.py
    └── views/
        ├── __init__.py
        ├── default.py
        ├── mahasiswa.py
        └── matakuliah.py
```

## Instalasi dan Menjalankan Aplikasi

### 1. Prasyarat

- Python 3.9 atau lebih baru
- PostgreSQL yang sudah berjalan

### 2. Buat Virtual Environment dan Install Dependensi

```bash
python -m venv venv

# Linux / macOS
source venv/bin/activate
# Windows
venv\Scripts\activate

pip install --upgrade pip setuptools
pip install -e .
```

### 3. Buat Database PostgreSQL

```bash
psql -U postgres -c "CREATE DATABASE pyramid_mahasiswa;"
```

### 4. Sesuaikan Koneksi Database

Ubah `sqlalchemy.url` pada **`development.ini`** dan **`alembic.ini`**
(nilainya harus sama):

```ini
sqlalchemy.url = postgresql+psycopg2://USER:PASSWORD@localhost:5432/pyramid_mahasiswa
```

### 5. Jalankan Migrasi Alembic

```bash
# (opsional) membuat revisi baru secara otomatis dari perubahan model
alembic revision --autogenerate -m "create matakuliah table"

# menerapkan seluruh migrasi ke database
alembic upgrade head
```

> Berkas migrasi untuk tabel `mahasiswa` dan `matakuliah` sudah tersedia di
> `pyramid_mahasiswa/alembic/versions/`, sehingga cukup menjalankan
> `alembic upgrade head`. Jalankan `alembic revision --autogenerate` hanya jika
> model diubah lagi.

### 6. Isi Data Awal (Seeding)

```bash
initialize_pyramid_mahasiswa_db development.ini
```

Seeding menambahkan 4 mata kuliah (IF2110, IF3140, IF2210, IF3130) dan 2
mahasiswa. Perintah ini aman dijalankan berulang kali (data tidak digandakan).

### 7. Jalankan Server

```bash
pserve development.ini --reload
```

Server berjalan di `http://localhost:6543`.

## Pengujian dengan cURL

### Matakuliah

```bash
# 1. GET semua mata kuliah
curl -i http://localhost:6543/api/matakuliah

# 2. GET detail mata kuliah
curl -i http://localhost:6543/api/matakuliah/1

# 3. GET id tidak ditemukan (404)
curl -i http://localhost:6543/api/matakuliah/9999

# 4. POST tambah mata kuliah (201)
curl -i -X POST http://localhost:6543/api/matakuliah \
  -H "Content-Type: application/json" \
  -d '{"kode_mk": "IF3150", "nama_mk": "Rekayasa Perangkat Lunak", "sks": 3, "semester": 5}'

# 5. POST data tidak lengkap (400)
curl -i -X POST http://localhost:6543/api/matakuliah \
  -H "Content-Type: application/json" \
  -d '{"kode_mk": "IF9999", "nama_mk": "Tanpa SKS"}'

# 6. POST sks bernilai nol / negatif (400)
curl -i -X POST http://localhost:6543/api/matakuliah \
  -H "Content-Type: application/json" \
  -d '{"kode_mk": "IF9998", "nama_mk": "SKS Salah", "sks": 0, "semester": -1}'

# 7. PUT perbarui mata kuliah (200)
curl -i -X PUT http://localhost:6543/api/matakuliah/1 \
  -H "Content-Type: application/json" \
  -d '{"nama_mk": "Pemrograman Web Lanjut", "sks": 4}'

# 8. DELETE hapus mata kuliah (200)
curl -i -X DELETE http://localhost:6543/api/matakuliah/5
```

### Mahasiswa

```bash
curl -i http://localhost:6543/api/mahasiswa
curl -i http://localhost:6543/api/mahasiswa/1

curl -i -X POST http://localhost:6543/api/mahasiswa \
  -H "Content-Type: application/json" \
  -d '{"nim": "124140100", "nama": "Contoh Baru", "jurusan": "Teknik Informatika", "angkatan": 2024}'

curl -i -X PUT http://localhost:6543/api/mahasiswa/1 \
  -H "Content-Type: application/json" \
  -d '{"jurusan": "Sistem Informasi"}'

curl -i -X DELETE http://localhost:6543/api/mahasiswa/3
```

## Bukti Pengujian (Screenshot)

> Simpan tangkapan layar hasil pengujian pada folder `screenshots/` dengan
> nama berkas berikut.

### Matakuliah

| Pengujian | Screenshot |
|---|---|
| GET semua matakuliah | ![GET list](Screenshoot/prak 6.1.png) |
| POST berhasil (201) | ![POST](Screenshoot/prak 6.2.png) |
| PUT berhasil (200) | ![PUT](Screenshoot/prak 6.3.png) |
| DELETE berhasil (200) | ![DELETE](Screenshoot/prak 6.4.png) |
| API | (Screenshoot/prak 6.10.png)

### Mahasiswa

| Pengujian | Screenshot |
|---|---|
| GET semua mahasiswa | ![GET list](Screenshoot/prak 6.5.png) | 
| GET detail mahasiswa | ![GET list](Screenshoot/prak 6.6.png) |
| POST mahasiswa | ![POST](Screenshoot/prak 6.7.png) |
| PUT mahasiswa | ![PUT](Screenshoot/prak 6.8.png) |
| DELETE mahasiswa | ![DELETE](Screenshoot/prak 6.9.png) |
| API              | (Screenshoot/prak 6.11.png)