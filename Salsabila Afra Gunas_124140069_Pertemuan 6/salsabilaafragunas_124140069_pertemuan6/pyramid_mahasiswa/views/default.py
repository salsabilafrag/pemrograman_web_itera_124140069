from pyramid.view import view_config


@view_config(route_name='home', renderer='json')
def home_view(request):
    """Informasi singkat aplikasi dan daftar endpoint yang tersedia."""
    return {
        'aplikasi': 'RESTful API Manajemen Mahasiswa dan Matakuliah',
        'endpoint': {
            'mahasiswa': '/api/mahasiswa',
            'matakuliah': '/api/matakuliah',
        },
    }
