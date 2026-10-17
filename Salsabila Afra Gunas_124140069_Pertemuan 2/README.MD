📚 Tugas Kuliah

Personal dashboard untuk mengelola daftar tugas kuliah. Setiap tugas punya mata kuliah, deadline, dan prioritas. Aplikasi menghitung sisa hari ke deadline, menandai tugas yang terlambat, dan menampilkan progres penyelesaian. Dashboard juga memuat kutipan motivasi harian.

Fitur Aplikasi
Tambah, edit, hapus tugas (judul, mata kuliah, deadline, prioritas)
Tandai selesai lewat checkbox, dan hapus semua tugas selesai sekaligus
Ringkasan statistik: total, aktif, selesai, terlambat, plus progress bar
Penanda deadline otomatis: "Hari ini!", "2 hari lagi", "Terlambat 3 hari"
Pencarian (judul / mata kuliah) dan filter Semua / Aktif / Selesai
Pengurutan otomatis: yang belum selesai di atas, lalu berdasarkan deadline dan prioritas
Penyimpanan lokal: data tetap ada setelah browser ditutup (localStorage)
Kutipan harian (DummyJSON)
Data awal diambil dari JSONPlaceholder saat aplikasi pertama kali dibuka
Tampilan responsif (HP dan desktop)
Cara Menjalankan

Buka index.html di browser (atau pakai ekstensi Live Server di VS Code). Perlu koneksi internet agar kutipan dan data awal termuat. Tanpa internet, fitur tugas tetap berjalan.

Struktur file:

├── index.html
├── style.css
├── script.js
└── README.md
Screenshot 
![Image Alt](https://github.com/salsabilafrag/pemrograman_web_itera_124140069/blob/78fd6cfa678328461aa828af8fe81f78d1c86db8/Salsabila%20Afra%20Gunas_124140069_Pertemuan%202/Dashboard1.png)

Fitur ES6+ yang Diimplementasikan

Semua baris merujuk ke script.js.

Fitur ES6+ | Lokasi (baris) | Keterangan
const	9, 10, 14, 17, 20, 25, 28, 45, 135, 142, 152, 293, 305, 350 (dan lainnya)	Untuk nilai yang tidak diubah ulang (konstanta, elemen DOM, hasil fetch)
let	—	Tidak dipakai karena tidak ada variabel yang perlu di-reassign. Ini sesuai prinsip memakai const kecuali benar-benar perlu diubah
Arrow functions	17, 20, 25, 28 (helper); 117, 154, 181, 187, 249–253, 258–261, 267, 275, 281, 295–297, 327–328, 343	Helper escapeHtml, toDateInput, formatDate, generateId, serta callback map/filter/sort/event listener (jauh lebih dari 3)
Template literals	26, 28, 45–46, 59, 61–62, 136, 143, 201, 296, 307–322, 335, 337	Render HTML tugas dan widget, teks dinamis
Async/Await	98 (init), 134 (fetchJson), 140 (fetchQuote), 150 (seedFromApi)	Pemanggilan API publik dengan try/catch
Promise.allSettled	108	Kutipan dan seed data dimuat paralel, satu gagal tidak menghentikan yang lain
Classes	31 (TaskItem), 67 (DashboardApp)	TaskItem memodelkan data tugas, DashboardApp mengelola state, localStorage, fetch, dan render
Getter (class)	43, 50, 55, 292	daysLeft, isOverdue, deadlineLabel, visibleTasks
Destructuring	32 (parameter constructor), 142, 154, 199, 211, 253, 267, 270, 275, 295–296, 305–306, 327	Destructuring objek di parameter fungsi dan hasil API
Spread operator	164, 175, 181	Update array state secara immutable, dan gabung objek saat edit
Default parameter	32	Nilai bawaan id, course, deadline, priority, dll.
Numeric separator	14, 21, 288	86_400_000, 60_000, 30_000
Array methods (map, filter, find)	117, 154, 181, 187, 192, 199, 202, 209, 295–297, 327–328, 343	Pengolahan data tanpa mengubah array asli
Penggunaan localStorage
Kunci: tugasKuliah.v1
DashboardApp.load() (baris 113) membaca dan mengubah JSON menjadi objek TaskItem
DashboardApp.save() (baris 125) menyimpan ulang setiap kali data berubah (tambah, edit, hapus, centang)
Pada kunjungan pertama (belum ada data), seedFromApi() (baris 150) mengisi 5 tugas contoh dari JSONPlaceholder lalu menyimpannya 

API Publik yang Digunakan
Fungsi	Endpoint
Kutipan harian	https://dummyjson.com/quotes/random
Data tugas awal	https://jsonplaceholder.typicode.com/todos?_limit=5 

Keamanan

Semua teks dari pengguna dan API di-escape lewat escapeHtml() (baris 17) sebelum dimasukkan ke innerHTML, sehingga terlindung dari injeksi HTML/XSS.
