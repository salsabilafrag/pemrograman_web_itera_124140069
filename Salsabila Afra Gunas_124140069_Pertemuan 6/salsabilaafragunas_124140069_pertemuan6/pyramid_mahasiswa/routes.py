def includeme(config):
    """Registrasi seluruh route URL Dispatch beserta predikat HTTP method."""
    # Halaman utama
    config.add_route('home', '/', request_method='GET')

    # Resource Mahasiswa
    config.add_route(
        'mahasiswa_list', '/api/mahasiswa', request_method='GET')
    config.add_route(
        'mahasiswa_create', '/api/mahasiswa', request_method='POST')
    config.add_route(
        'mahasiswa_detail', '/api/mahasiswa/{id:\\d+}', request_method='GET')
    config.add_route(
        'mahasiswa_update', '/api/mahasiswa/{id:\\d+}', request_method='PUT')
    config.add_route(
        'mahasiswa_delete', '/api/mahasiswa/{id:\\d+}',
        request_method='DELETE')

    # Resource Matakuliah
    config.add_route(
        'matakuliah_list', '/api/matakuliah', request_method='GET')
    config.add_route(
        'matakuliah_create', '/api/matakuliah', request_method='POST')
    config.add_route(
        'matakuliah_detail', '/api/matakuliah/{id:\\d+}',
        request_method='GET')
    config.add_route(
        'matakuliah_update', '/api/matakuliah/{id:\\d+}',
        request_method='PUT')
    config.add_route(
        'matakuliah_delete', '/api/matakuliah/{id:\\d+}',
        request_method='DELETE')
