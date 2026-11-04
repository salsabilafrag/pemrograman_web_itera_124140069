"""Tugas 1: Program Penghitung BMI (Body Mass Index) sederhana."""


def hitung_bmi(berat, tinggi):
    """Menghitung nilai BMI.

    Parameter:
        berat (float): Berat badan dalam kilogram (kg).
        tinggi (float): Tinggi badan dalam meter (m).

    Mengembalikan:
        float: Nilai BMI = berat / (tinggi * tinggi).
    """
    return berat / (tinggi * tinggi)


def tentukan_kategori(bmi):
    """Menentukan kategori status berat badan berdasarkan nilai BMI.

    Parameter:
        bmi (float): Nilai BMI.

    Mengembalikan:
        str: Kategori berat badan.
    """
    if bmi < 18.5:
        return "Berat badan kurang"
    elif bmi < 25:
        return "Berat badan normal"
    elif bmi < 30:
        return "Berat badan berlebih"
    else:
        return "Obesitas"


def baca_angka_positif(pesan):
    """Membaca input angka positif dari pengguna (diulang sampai valid).

    Parameter:
        pesan (str): Teks yang ditampilkan saat meminta input.

    Mengembalikan:
        float: Angka positif yang dimasukkan pengguna.
    """
    while True:
        try:
            nilai = float(input(pesan).replace(",", "."))
            if nilai > 0:
                return nilai
            print("Nilai harus lebih besar dari 0.")
        except ValueError:
            print("Input tidak valid, masukkan angka.")


def main():
    """Fungsi utama: baca input, hitung BMI, dan cetak hasilnya."""
    print("=== Program Penghitung BMI ===")
    berat = baca_angka_positif("Masukkan berat badan (kg)  : ")
    tinggi = baca_angka_positif("Masukkan tinggi badan (m)  : ")

    bmi = hitung_bmi(berat, tinggi)
    kategori = tentukan_kategori(bmi)

    print("-" * 30)
    print(f"Berat badan : {berat:.2f} kg")
    print(f"Tinggi badan: {tinggi:.2f} m")
    print(f"Nilai BMI   : {bmi:.2f}")
    print(f"Kategori    : {kategori}")


if __name__ == "__main__":
    main()
