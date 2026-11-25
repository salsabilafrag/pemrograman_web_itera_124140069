"""View controller CRUD untuk resource Mahasiswa."""
from pyramid.httpexceptions import HTTPBadRequest, HTTPNotFound
from pyramid.view import view_config

from ..models import Mahasiswa

REQUIRED_FIELDS = ('nim', 'nama', 'jurusan', 'angkatan')
TEXT_FIELDS = ('nim', 'nama', 'jurusan')
INTEGER_FIELDS = ('angkatan',)
MAX_INT4 = 2147483647


def _bad_request(message, **extra):
    body = {'status': 'error', 'message': message}
    body.update(extra)
    return HTTPBadRequest(json_body=body)


def _get_json_body(request):
    try:
        data = request.json_body
    except ValueError:
        raise _bad_request('Body request harus berupa JSON yang valid.')
    if not isinstance(data, dict):
        raise _bad_request('Body request harus berupa objek JSON.')
    return data


def _validate_payload(data, partial=False):
    if not partial:
        missing = [
            field for field in REQUIRED_FIELDS
            if data.get(field) is None or data.get(field) == ''
        ]
        if missing:
            raise _bad_request(
                'Data tidak lengkap.', missing_fields=missing)

    errors = {}
    cleaned = {}

    for field in TEXT_FIELDS:
        if field in data:
            value = data[field]
            if not isinstance(value, str) or not value.strip():
                errors[field] = 'harus berupa teks yang tidak kosong'
            else:
                cleaned[field] = value.strip()

    for field in INTEGER_FIELDS:
        if field in data:
            value = data[field]
            if (isinstance(value, bool) or not isinstance(value, int)
                    or value <= 0 or value > MAX_INT4):
                errors[field] = 'harus berupa bilangan bulat lebih dari 0'
            else:
                cleaned[field] = value

    if errors:
        raise _bad_request('Validasi gagal.', errors=errors)

    return cleaned


def _nim_exists(dbsession, nim, exclude_id=None):
    query = dbsession.query(Mahasiswa).filter(Mahasiswa.nim == nim)
    if exclude_id is not None:
        query = query.filter(Mahasiswa.id != exclude_id)
    return query.first() is not None


def _get_or_404(request):
    mahasiswa_id = int(request.matchdict['id'])
    mahasiswa = None
    if mahasiswa_id <= MAX_INT4:
        mahasiswa = request.dbsession.get(Mahasiswa, mahasiswa_id)
    if mahasiswa is None:
        raise HTTPNotFound(json_body={
            'status': 'error',
            'message': 'Mahasiswa dengan id {} tidak ditemukan.'.format(
                mahasiswa_id),
        })
    return mahasiswa


@view_config(route_name='mahasiswa_list', renderer='json')
def list_mahasiswa(request):
    """GET /api/mahasiswa - daftar seluruh mahasiswa."""
    items = request.dbsession.query(Mahasiswa).order_by(Mahasiswa.id).all()
    return {
        'status': 'success',
        'total': len(items),
        'data': [item.to_dict() for item in items],
    }


@view_config(route_name='mahasiswa_detail', renderer='json')
def detail_mahasiswa(request):
    """GET /api/mahasiswa/{id} - detail satu mahasiswa."""
    mahasiswa = _get_or_404(request)
    return {'status': 'success', 'data': mahasiswa.to_dict()}


@view_config(route_name='mahasiswa_create', renderer='json')
def create_mahasiswa(request):
    """POST /api/mahasiswa - tambah mahasiswa baru."""
    cleaned = _validate_payload(_get_json_body(request))

    if _nim_exists(request.dbsession, cleaned['nim']):
        raise _bad_request('NIM {} sudah terdaftar.'.format(cleaned['nim']))

    mahasiswa = Mahasiswa(**cleaned)
    request.dbsession.add(mahasiswa)
    request.dbsession.flush()

    request.response.status = 201
    return {
        'status': 'success',
        'message': 'Mahasiswa berhasil ditambahkan.',
        'data': mahasiswa.to_dict(),
    }


@view_config(route_name='mahasiswa_update', renderer='json')
def update_mahasiswa(request):
    """PUT /api/mahasiswa/{id} - perbarui data mahasiswa."""
    mahasiswa = _get_or_404(request)
    cleaned = _validate_payload(_get_json_body(request), partial=True)

    if not cleaned:
        raise _bad_request(
            'Sertakan minimal satu field yang akan diperbarui.',
            fields=list(REQUIRED_FIELDS))

    if 'nim' in cleaned and _nim_exists(
            request.dbsession, cleaned['nim'], exclude_id=mahasiswa.id):
        raise _bad_request('NIM {} sudah terdaftar.'.format(cleaned['nim']))

    for field, value in cleaned.items():
        setattr(mahasiswa, field, value)
    request.dbsession.flush()

    return {
        'status': 'success',
        'message': 'Mahasiswa berhasil diperbarui.',
        'data': mahasiswa.to_dict(),
    }


@view_config(route_name='mahasiswa_delete', renderer='json')
def delete_mahasiswa(request):
    """DELETE /api/mahasiswa/{id} - hapus mahasiswa."""
    mahasiswa = _get_or_404(request)
    deleted = mahasiswa.to_dict()
    request.dbsession.delete(mahasiswa)

    return {
        'status': 'success',
        'message': 'Mahasiswa berhasil dihapus.',
        'data': deleted,
    }
