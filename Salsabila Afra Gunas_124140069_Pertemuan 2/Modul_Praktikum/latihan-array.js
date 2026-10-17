
console.log("=== LATIHAN ARRAY METHODS ===");

const mahasiswa = [
    { nama: "Caca", prodi: "Informatika", nilai: 80 },
    { nama: "Afra", prodi: "Informatika", nilai: 90 },
    { nama: "Sabil", prodi: "Teknik Elektro", nilai: 85 },
    { nama: "Sal", prodi: "Teknik Elektro", nilai: 95 }
];

// 1. Mengelompokkan mahasiswa berdasarkan prodi
const groupBy = (data, kunci) => {
    return data.reduce((kelompok, item) => {
        const kategori = item[kunci];

        if (!kelompok[kategori]) {
            kelompok[kategori] = [];
        }

        kelompok[kategori].push(item);
        return kelompok;
    }, {});
};

console.log(groupBy(mahasiswa, "prodi"));

// 2. Menghitung rata-rata nilai
const rataRata = data => {
    const total = data.reduce((jumlah, item) => {
        return jumlah + item.nilai;
    }, 0);

    return total / data.length;
};

console.log("Rata-rata:", rataRata(mahasiswa));

// 3. Meratakan array bersarang
const angkaBersarang = [1, [2, 3], [4, [5, 6]]];
const angkaFlat = angkaBersarang.flat(Infinity);

console.log("Array rata:", angkaFlat);

// 4. Gabungan filter, map, dan reduce
const mahasiswaLulus = mahasiswa
    .filter(item => item.nilai >= 85)
    .map(item => ({
        nama: item.nama,
        nilai: item.nilai
    }));

const totalNilai = mahasiswaLulus.reduce(
    (total, item) => total + item.nilai,
    0
);

console.log("Mahasiswa dengan nilai minimal 85:", mahasiswaLulus);
console.log("Total nilai mereka:", totalNilai);
