console.log("=== LATIHAN DASAR ES6+ ===");

// 1. Perbedaan let dan const
let nama = "Salsabila";
nama = "Afra";

const umur = 20;

console.log("Nama:", nama);
console.log("Umur:", umur);

// Coba hilangkan tanda komentar untuk melihat error:
// umur = 21;

// 2. Perbandingan var di dalam blok
var tugasLama = "Tugas awal";

{
    var tugasLama = "Tugas berubah";
}

console.log("Hasil var:", tugasLama);

// 3. Variasi arrow function
const tambah = (a, b) => a + b;
const kuadrat = angka => angka * angka;
const salam = () => "Halo, selamat belajar!";

console.log("Hasil tambah:", tambah(3, 5));
console.log("Hasil kuadrat:", kuadrat(4));
console.log(salam());

// 4. Template literals untuk HTML
const tugas = {
    nama: "Laporan PAW",
    matkul: "Pengembangan Aplikasi Web"
};

const kartuHTML = `
    <div>
        <h3>${tugas.nama}</h3>
        <p>Mata kuliah: ${tugas.matkul}</p>
    </div>
`;

console.log(kartuHTML);