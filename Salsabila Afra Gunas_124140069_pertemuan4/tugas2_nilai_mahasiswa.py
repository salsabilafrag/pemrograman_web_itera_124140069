"""Tugas 2: Program Pengelolaan Data Nilai Mahasiswa."""

BOBOT_UTS = 0.30
BOBOT_UAS = 0.40
BOBOT_TUGAS = 0.30

data_mahasiswa = [
    {"nama": "Salsa", "nim": "124140069",
     "nilai_uts": 100, "nilai_uas": 100, "nilai_tugas": 100},
    {"nama": "Cantika", "nim": "124140300",
     "nilai_uts": 70, "nilai_uas": 75, "nilai_tugas": 80},
    {"nama": "Bunga", "nim": "124140301",
     "nilai_uts": 50, "nilai_uas": 65, "nilai_tugas": 70},
    {"nama": "Bulan", "nim": "124140302",
     "nilai_uts": 70, "nilai_uas": 50, "nilai_tugas": 60},
    {"nama": "Iky", "nim": "124140303",
     "nilai_uts": 40, "nilai_uas": 45, "nilai_tugas": 35},
    {"nama": "Bumi", "nim": "124140304",
     "nilai_uts": 78, "nilai_uas": 82, "nilai_tugas": 75},
]


def hitung_nilai_akhir(uts, uas, tugas):
    """Menghitung nilai akhir berbobot.

    Parameter:
        uts (float): Nilai UTS (bobot 30%).
        uas (float): Nilai UAS (bobot 40%).
        tugas (float): Nilai tugas (bobot 30%).

    Mengembalikan:
        float: Nilai akhir.
    """
    return BOBOT_UTS * uts + BOBOT_UAS * uas + BOBOT_TUGAS * tugas


def tentukan_grade(nilai_akhir):
    """Menentukan grade huruf dari nilai akhir.

    Parameter:
        nilai_akhir (float): Nilai akhir mahasiswa.

    Mengembalikan:
        str: Grade A, B, C, D, atau E.
    """
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"


def proses_data(daftar):
    """Menambahkan kunci nilai_akhir dan grade ke setiap data mahasiswa.

    Parameter:
        daftar (list): List berisi dictionary data mahasiswa.

    Mengembalikan:
        None: Data pada list diubah langsung.
    """
    for mhs in daftar:
        mhs["nilai_akhir"] = hitung_nilai_akhir(
            mhs["nilai_uts"], mhs["nilai_uas"], mhs["nilai_tugas"]
        )
        mhs["grade"] = tentukan_grade(mhs["nilai_akhir"])


def tampilkan_tabel(daftar):
    """Mencetak tabel data mahasiswa ke terminal.

    Parameter:
        daftar (list): List berisi dictionary data mahasiswa yang sudah
            memiliki kunci nilai_akhir dan grade.

    Mengembalikan:
        None
    """
    garis = "+" + "-" * 5 + "+" + "-" * 22 + "+" + "-" * 13 + "+" \
        + "-" * 13 + "+" + "-" * 7 + "+"
    print(garis)
    print(f"| {'No':<3} | {'Nama':<20} | {'NIM':<11} | "
          f"{'Nilai Akhir':>11} | {'Grade':^5} |")
    print(garis)
    for no, mhs in enumerate(daftar, start=1):
        print(f"| {no:<3} | {mhs['nama']:<20} | {mhs['nim']:<11} | "
              f"{mhs['nilai_akhir']:>11.2f} | {mhs['grade']:^5} |")
    print(garis)


def cetak_mahasiswa(judul, mhs):
    """Mencetak informasi satu mahasiswa.

    Parameter:
        judul (str): Judul yang ditampilkan.
        mhs (dict): Data mahasiswa.

    Mengembalikan:
        None
    """
    print(f"{judul}")
    print(f"  Nama        : {mhs['nama']}")
    print(f"  NIM         : {mhs['nim']}")
    print(f"  Nilai Akhir : {mhs['nilai_akhir']:.2f}")
    print(f"  Grade       : {mhs['grade']}")


def main():
    """Fungsi utama: proses data, cetak tabel, cari nilai maks/min."""
    proses_data(data_mahasiswa)

    print("=== DAFTAR NILAI MAHASISWA ===")
    tampilkan_tabel(data_mahasiswa)

    tertinggi = max(data_mahasiswa, key=lambda m: m["nilai_akhir"])
    terendah = min(data_mahasiswa, key=lambda m: m["nilai_akhir"])

    print()
    cetak_mahasiswa("Mahasiswa dengan nilai akhir TERTINGGI:", tertinggi)
    print()
    cetak_mahasiswa("Mahasiswa dengan nilai akhir TERENDAH:", terendah)


if __name__ == "__main__":
    main()
