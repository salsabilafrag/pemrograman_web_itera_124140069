
console.log("=== LATIHAN CLASS ===");

// 1. Class Product
class Product {
    constructor(nama, harga = 0) {
        this.nama = nama;
        this.harga = harga;
    }

    get info() {
        return `${this.nama}: Rp${this.harga}`;
    }

    set hargaBaru(nilai) {
        if (nilai >= 0) {
            this.harga = nilai;
        }
    }
}

// Class turunan untuk produk digital
class DigitalProduct extends Product {
    constructor(nama, harga, ukuranFile) {
        super(nama, harga);
        this.ukuranFile = ukuranFile;
    }
}

// Class turunan untuk produk fisik
class PhysicalProduct extends Product {
    constructor(nama, harga, stok) {
        super(nama, harga);
        this.stok = stok;
    }
}

const ebook = new DigitalProduct("E-book JavaScript", 50000, "10 MB");
const buku = new PhysicalProduct("Buku Pemrograman", 80000, 10);

console.log(ebook.info);
console.log("Ukuran file:", ebook.ukuranFile);
console.log(buku.info);
console.log("Stok:", buku.stok);

// 2. Getter dan setter
buku.hargaBaru = 75000;
console.log("Harga baru:", buku.harga);

// 3. Computed property names
const kunci = "status";
const informasi = {
    nama: "Dashboard",
    [kunci]: "Aktif"
};

console.log(informasi);

// 4. Default parameter dan destructuring
const buatProduk = (
    { nama, harga = 0 } = { nama: "Produk Baru" }
) => {
    return { nama, harga };
};

console.log(buatProduk({ nama: "Mouse", harga: 100000 }));
console.log(buatProduk());
