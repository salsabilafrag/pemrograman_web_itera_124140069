console.log("=== LATIHAN DESTRUCTURING ===");

// 1. Destructuring objek dengan 3 level
const mahasiswa = {
    nama: "Salsabila",
    akademik: {
        prodi: "Teknik Informatika",
        semester: {
            aktif: 5
        }
    }
};

const {
    akademik: {
        prodi,
        semester: { aktif }
    }
} = mahasiswa;

console.log("Prodi:", prodi);
console.log("Semester:", aktif);

// 2. Rest parameter untuk statistik
const statistik = (...angka) => {
    return {
        min: Math.min(...angka),
        max: Math.max(...angka),
        average: angka.reduce((total, nilai) => total + nilai, 0)
            / angka.length
    };
};

console.log(statistik(70, 80, 90, 100));

// 3. Menggabungkan 3 objek
const identitas = { nama: "Afra", umur: 20 };
const kuliah = { prodi: "Informatika", semester: 5 };
const tambahan = { umur: 21, kampus: "ITERA" };

const dataMahasiswa = {
    ...identitas,
    ...kuliah,
    ...tambahan
};

console.log(dataMahasiswa);

// 4. Destructuring dalam for...of
const daftarMahasiswa = [
    { nama: "Sabil", nilai: 85 },
    { nama: "Caca", nilai: 90 },
    { nama: "Sals", nilai: 95 }
];

for (const { nama, nilai } of daftarMahasiswa) {
    console.log(`${nama} memperoleh nilai ${nilai}`);
}