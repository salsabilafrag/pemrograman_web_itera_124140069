from setuptools import find_packages, setup

requires = [
    'alembic',
    'plaster_pastedeploy',
    'psycopg2-binary',
    'pyramid',
    'pyramid_retry',
    'pyramid_tm',
    'SQLAlchemy',
    'transaction',
    'waitress',
    'zope.sqlalchemy',
]

setup(
    name='pyramid_mahasiswa',
    version='0.1',
    description='RESTful API Manajemen Mahasiswa dan Matakuliah (Pyramid)',
    classifiers=[
        'Programming Language :: Python',
        'Framework :: Pyramid',
        'Topic :: Internet :: WWW/HTTP',
        'Topic :: Internet :: WWW/HTTP :: WSGI :: Application',
    ],
    author='Salsabila Afra Gunas',
    keywords='web pyramid pylons rest api',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=requires,
    entry_points={
        'paste.app_factory': [
            'main = pyramid_mahasiswa:main',
        ],
        'console_scripts': [
            'initialize_pyramid_mahasiswa_db = '
            'pyramid_mahasiswa.scripts.initialize_db:main',
        ],
    },
)
