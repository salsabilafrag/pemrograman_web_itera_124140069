# Tugas Praktikum Dasar Pemrograman Python (Pertemuan 4)

## Identitas Mahasiswa

- **Nama** : Salsabila Afra Gunas
- **NIM**  : 124140069

## Struktur Folder

```
Salsabila Afra Gunas_124140069_pertemuan4/
├── .gitignore
├── README.md
├── tugas1_bmi.py
├── tugas2_nilai_mahasiswa.py
├── math_operations.py
└── main.py
```

## Deskripsi Program

### 1. `tugas1_bmi.py` - Penghitung BMI
Program meminta berat badan (kg) dan tinggi badan (m) melalui `input()`, lalu menghitung
BMI dengan rumus `berat / (tinggi * tinggi)`. Kategori ditentukan dengan `if-elif-else`:

| BMI           | Kategori             |
|---------------|----------------------|
| < 18.5        | Berat badan kurang   |
| 18.5 - < 25   | Berat badan normal   |
| 25 - < 30     | Berat badan berlebih |
| >= 30         | Obesitas             |

Fungsi: `hitung_bmi()`, `tentukan_kategori()`, `baca_angka_positif()`, `main()`.
Hasil BMI dicetak dengan 2 angka desimal (f-string).

### 2. `tugas2_nilai_mahasiswa.py` - Pengelolaan Nilai Mahasiswa
Data disimpan dalam list berisi 6 dictionary (`nama`, `nim`, `nilai_uts`, `nilai_uas`,
`nilai_tugas`). Alur kerja:
1. Hitung nilai akhir = 30% UTS + 40% UAS + 30% Tugas (`hitung_nilai_akhir()`).
2. Tentukan grade A-E (`tentukan_grade()`).
3. Tampilkan tabel rapi berisi Nama, NIM, Nilai Akhir, Grade (`tampilkan_tabel()`).
4. Cari mahasiswa dengan nilai akhir tertinggi dan terendah menggunakan `max()` dan `min()`.

### 3. `math_operations.py` dan `main.py` - Modul Matematika
- `math_operations.py` berisi konstanta `PI`, fungsi luas & keliling persegi, persegi panjang,
  dan lingkaran, serta konversi suhu `celsius_ke_fahrenheit()` dan `celsius_ke_kelvin()`.
- `main.py` mengimpor modul dengan beberapa cara (`import math_operations`,
  `from math_operations import ...`, dan `from ... import ... as ...`), memanggil seluruh
  fungsi dengan berbagai nilai uji, dan menampilkan hasil secara terstruktur.

## Cara Menjalankan (VS Code)

Buka folder proyek di VS Code, buka terminal (`Ctrl + ``), lalu jalankan:

```bash
python tugas1_bmi.py
python tugas2_nilai_mahasiswa.py
python main.py
```

> Gunakan `python3` jika perintah `python` tidak dikenali.

## Screenshot Hasil Eksekusi

### Soal 1 - BMI
![Hasil Soal 1](screenshots/tugas%201.png)

### Soal 2 - Nilai Mahasiswa
![Hasil Soal 2](screenshots/tugas%202.png)

### Soal 3 - Modul Matematika
![Hasil Soal 3](screenshots/tugas%203.png)

## Catatan Pengumpulan

- Nama repositori GitHub: `pemrograman_web_itera_124140069`
- Folder `venv/` dan `__pycache__/` sudah terdaftar di `.gitignore`.
