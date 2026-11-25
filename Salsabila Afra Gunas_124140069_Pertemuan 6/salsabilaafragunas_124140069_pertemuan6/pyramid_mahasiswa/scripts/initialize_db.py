import argparse
import sys

from pyramid.paster import bootstrap, setup_logging
from sqlalchemy.exc import OperationalError

from ..models import Mahasiswa, Matakuliah

SEED_MAHASISWA = [
    {
        'nim': '124140069',
        'nama': 'Salsabila Afra Gunas',
        'jurusan': 'Teknik Informatika',
        'angkatan': 2024,
    },
    {
        'nim': '124140001',
        'nama': 'Mahasiswa Contoh',
        'jurusan': 'Teknik Informatika',
        'angkatan': 2024,
    },
]

SEED_MATAKULIAH = [
    {
        'kode_mk': 'IF2110',
        'nama_mk': 'Pemrograman Web',
        'sks': 3,
        'semester': 3,
    },
    {
        'kode_mk': 'IF3140',
        'nama_mk': 'Basis Data',
        'sks': 4,
        'semester': 5,
    },
    {
        'kode_mk': 'IF2210',
        'nama_mk': 'Pemrograman Berorientasi Objek',
        'sks': 3,
        'semester': 4,
    },
    {
        'kode_mk': 'IF3130',
        'nama_mk': 'Jaringan Komputer',
        'sks': 3,
        'semester': 5,
    },
]


def seed_table(dbsession, model, key, rows):
    """Tambahkan data awal yang belum ada (aman dijalankan berulang kali)."""
    for row in rows:
        exists = dbsession.query(model).filter(
            getattr(model, key) == row[key]).first()
        if exists is None:
            dbsession.add(model(**row))


def setup_models(dbsession):
    """Isi tabel dengan data awal (seeding)."""
    seed_table(dbsession, Mahasiswa, 'nim', SEED_MAHASISWA)
    seed_table(dbsession, Matakuliah, 'kode_mk', SEED_MATAKULIAH)


def parse_args(argv):
    parser = argparse.ArgumentParser(
        description='Isi database dengan data awal (seeding).')
    parser.add_argument(
        'config_uri',
        help='Berkas konfigurasi, contoh: development.ini',
    )
    return parser.parse_args(argv[1:])


def main(argv=sys.argv):
    args = parse_args(argv)
    setup_logging(args.config_uri)
    env = bootstrap(args.config_uri)

    try:
        with env['request'].tm:
            dbsession = env['request'].dbsession
            setup_models(dbsession)
    except OperationalError:
        print(
            'Gagal terhubung ke database PostgreSQL.\n'
            'Periksa sqlalchemy.url pada berkas .ini dan pastikan '
            'migrasi sudah dijalankan (alembic upgrade head).'
        )
        sys.exit(1)

    print('Seeding selesai.')
