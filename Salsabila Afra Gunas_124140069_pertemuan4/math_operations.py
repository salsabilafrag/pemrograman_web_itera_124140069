"""Modul operasi matematika: geometri dan konversi suhu."""

PI = 3.14159


# ---------- Persegi ----------
def luas_persegi(sisi):
    """Menghitung luas persegi.

    Parameter:
        sisi (float): Panjang sisi.

    Mengembalikan:
        float: Luas persegi (sisi * sisi).
    """
    return sisi * sisi


def keliling_persegi(sisi):
    """Menghitung keliling persegi.

    Parameter:
        sisi (float): Panjang sisi.

    Mengembalikan:
        float: Keliling persegi (4 * sisi).
    """
    return 4 * sisi


# ---------- Persegi panjang ----------
def luas_persegi_panjang(panjang, lebar):
    """Menghitung luas persegi panjang.

    Parameter:
        panjang (float): Panjang.
        lebar (float): Lebar.

    Mengembalikan:
        float: Luas (panjang * lebar).
    """
    return panjang * lebar


def keliling_persegi_panjang(panjang, lebar):
    """Menghitung keliling persegi panjang.

    Parameter:
        panjang (float): Panjang.
        lebar (float): Lebar.

    Mengembalikan:
        float: Keliling (2 * (panjang + lebar)).
    """
    return 2 * (panjang + lebar)


# ---------- Lingkaran ----------
def luas_lingkaran(jari_jari):
    """Menghitung luas lingkaran.

    Parameter:
        jari_jari (float): Jari-jari lingkaran.

    Mengembalikan:
        float: Luas lingkaran (PI * r * r).
    """
    return PI * jari_jari * jari_jari


def keliling_lingkaran(jari_jari):
    """Menghitung keliling lingkaran.

    Parameter:
        jari_jari (float): Jari-jari lingkaran.

    Mengembalikan:
        float: Keliling lingkaran (2 * PI * r).
    """
    return 2 * PI * jari_jari


# ---------- Konversi suhu ----------
def celsius_ke_fahrenheit(celsius):
    """Mengonversi suhu Celsius ke Fahrenheit.

    Parameter:
        celsius (float): Suhu dalam Celsius.

    Mengembalikan:
        float: Suhu dalam Fahrenheit.
    """
    return (celsius * 9 / 5) + 32


def celsius_ke_kelvin(celsius):
    """Mengonversi suhu Celsius ke Kelvin.

    Parameter:
        celsius (float): Suhu dalam Celsius.

    Mengembalikan:
        float: Suhu dalam Kelvin.
    """
    return celsius + 273.15
