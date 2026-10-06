const formBarang = document.getElementById("formBarang");

const namaBarang = document.getElementById("namaBarang");
const hargaBarang = document.getElementById("hargaBarang");
const qtyBarang = document.getElementById("qtyBarang");

const errorNama = document.getElementById("errorNama");
const errorHarga = document.getElementById("errorHarga");
const errorQty = document.getElementById("errorQty");

const tabelKeranjang = document.getElementById("tabelKeranjang");

const totalBelanja = document.getElementById("totalBelanja");
const totalDiskon = document.getElementById("totalDiskon");
const totalAkhir = document.getElementById("totalAkhir");

const uangBayar = document.getElementById("uangBayar");
const statusPembayaran = document.getElementById("statusPembayaran");
const kembalian = document.getElementById("kembalian");

const btnReset = document.getElementById("btnReset");



let keranjang = JSON.parse(
    localStorage.getItem("keranjang")
) || [];



formBarang.addEventListener("submit", function(event) {

    event.preventDefault();

    errorNama.textContent = "";
    errorHarga.textContent = "";
    errorQty.textContent = "";

    const nama = namaBarang.value.trim();
    const harga = Number(hargaBarang.value);
    const qty = Number(qtyBarang.value);

    let valid = true;



    if (nama === "") {

        errorNama.textContent = "Nama barang wajib diisi.";
        valid = false;

    } else if (nama.length < 3) {

        errorNama.textContent =
            "Nama barang minimal 3 karakter.";

        valid = false;
    }



    if (hargaBarang.value === "") {

        errorHarga.textContent =
            "Harga wajib diisi.";

        valid = false;

    } else if (harga < 500) {

        errorHarga.textContent =
            "Harga minimal Rp500.";

        valid = false;
    }



    if (qtyBarang.value === "") {

        errorQty.textContent =
            "Jumlah barang wajib diisi.";

        valid = false;

    } else if (!Number.isInteger(qty) || qty < 1) {

        errorQty.textContent =
            "Qty harus berupa angka bulat minimal 1.";

        valid = false;
    }



    if (!valid) {
        return;
    }



    const barangBaru = {
        nama: nama,
        harga: harga,
        qty: qty
    };


    keranjang.push(barangBaru);

    simpanData();

    tampilkanData();

    formBarang.reset();

});



function tampilkanData() {

    tabelKeranjang.innerHTML = "";

    keranjang.forEach(function(barang, index) {

        const subtotal = barang.harga * barang.qty;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>

            <td>${barang.nama}</td>

            <td>
                Rp ${barang.harga.toLocaleString("id-ID")}
            </td>

            <td>${barang.qty}</td>

            <td>
                Rp ${subtotal.toLocaleString("id-ID")}
            </td>

            <td>
                <button
                    class="btn-hapus"
                    onclick="hapusData(${index})">
                    Hapus
                </button>
            </td>
        `;

        tabelKeranjang.appendChild(row);
    });

    hitungPembayaran();
}




function hapusData(index) {


    keranjang.splice(index, 1);

    simpanData();

    tampilkanData();

    perbaruiKembalian();
}



function hitungPembayaran() {

    let total = 0;

    keranjang.forEach(function(barang) {

        const subtotal = barang.harga * barang.qty;

        total = total + subtotal;
    });



    let diskon = 0;

    if (total >= 50000) {

        diskon = total * 0.10;
    }



    const hasilAkhir = total - diskon;



    totalBelanja.textContent =
        "Rp " + total.toLocaleString("id-ID");

    totalDiskon.textContent =
        "Rp " + diskon.toLocaleString("id-ID");

    totalAkhir.textContent =
        "Rp " + hasilAkhir.toLocaleString("id-ID");

    return hasilAkhir;
}



uangBayar.addEventListener("input", function() {

    perbaruiKembalian();

});


function perbaruiKembalian() {

    const uang = Number(uangBayar.value);

    const total = hitungPembayaran();


    if (uangBayar.value === "") {

        statusPembayaran.textContent = "";

        kembalian.textContent = "Rp 0";

        return;
    }


    if (uang < total) {

        statusPembayaran.textContent =
            "Uang belum mencukupi.";

        statusPembayaran.style.color = "#ff5c5c";

        kembalian.textContent = "Rp 0";

        return;
    }


    const hasil = uang - total;

    statusPembayaran.textContent =
        "Pembayaran mencukupi.";

    statusPembayaran.style.color = "#6ee7b7";

    kembalian.textContent =
        "Rp " + hasil.toLocaleString("id-ID");
}



function simpanData() {

    localStorage.setItem(
        "keranjang",
        JSON.stringify(keranjang)
    );
}



btnReset.addEventListener("click", function() {

    keranjang = [];

    localStorage.removeItem("keranjang");

    formBarang.reset();

    errorNama.textContent = "";
    errorHarga.textContent = "";
    errorQty.textContent = "";

    uangBayar.value = "";

    statusPembayaran.textContent = "";

    kembalian.textContent = "Rp 0";

    tampilkanData();

});



tampilkanData();