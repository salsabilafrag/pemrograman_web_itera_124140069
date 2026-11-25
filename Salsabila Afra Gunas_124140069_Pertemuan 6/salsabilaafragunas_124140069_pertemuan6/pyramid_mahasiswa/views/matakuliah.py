"""View controller CRUD untuk resource Matakuliah."""
from pyramid.httpexceptions import HTTPBadRequest, HTTPNotFound
from pyramid.view import view_config

from ..models import Matakuliah

REQUIRED_FIELDS = ('kode_mk', 'nama_mk', 'sks', 'semester')
TEXT_FIELDS = ('kode_mk', 'nama_mk')
INTEGER_FIELDS = ('sks', 'semester')
MAX_INT4 = 2147483647  # batas tipe INTEGER PostgreSQL


def _bad_request(message, **extra):
    body = {'status': 'error', 'message': message}
    body.update(extra)
    return HTTPBadRequest(json_body=body)


def _get_json_body(request):
    """Ambil body JSON; kembalikan 400 jika tidak valid."""
    try:
        data = request.json_body
    except ValueError:
        raise _bad_request('Body request harus berupa JSON yang valid.')
    if not isinstance(data, dict):
        raise _bad_request('Body request harus berupa objek JSON.')
    return data


def _validate_payload(data, partial=False):
    """Validasi dan bersihkan data masukan.

    Jika ``partial`` False (POST), semua field wajib harus ada.
    Jika ``partial`` True (PUT), hanya field yang dikirim yang divalidasi.
    """
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

    if 'kode_mk' in cleaned:
        cleaned['kode_mk'] = cleaned['kode_mk'].upper()

    return cleaned


def _kode_exists(dbsession, kode_mk, exclude_id=None):
    query = dbsession.query(Matakuliah).filter(Matakuliah.kode_mk == kode_mk)
    if exclude_id is not None:
        query = query.filter(Matakuliah.id != exclude_id)
    return query.first() is not None


def _get_or_404(request):
    """Ambil Matakuliah berdasarkan {id} pada URL, atau kembalikan 404."""
    matakuliah_id = int(request.matchdict['id'])
    matakuliah = None
    if matakuliah_id <= MAX_INT4:
        matakuliah = request.dbsession.get(Matakuliah, matakuliah_id)
    if matakuliah is None:
        raise HTTPNotFound(json_body={
            'status': 'error',
            'message': 'Mata kuliah dengan id {} tidak ditemukan.'.format(
                matakuliah_id),
        })
    return matakuliah


@view_config(route_name='matakuliah_list', renderer='json')
def list_matakuliah(request):
    """GET /api/matakuliah - daftar seluruh mata kuliah."""
    items = request.dbsession.query(Matakuliah).order_by(Matakuliah.id).all()
    return {
        'status': 'success',
        'total': len(items),
        'data': [item.to_dict() for item in items],
    }


@view_config(route_name='matakuliah_detail', renderer='json')
def detail_matakuliah(request):
    """GET /api/matakuliah/{id} - detail satu mata kuliah."""
    matakuliah = _get_or_404(request)
    return {'status': 'success', 'data': matakuliah.to_dict()}


@view_config(route_name='matakuliah_create', renderer='json')
def create_matakuliah(request):
    """POST /api/matakuliah - tambah mata kuliah baru."""
    cleaned = _validate_payload(_get_json_body(request))

    if _kode_exists(request.dbsession, cleaned['kode_mk']):
        raise _bad_request(
            'kode_mk {} sudah digunakan.'.format(cleaned['kode_mk']))

    matakuliah = Matakuliah(**cleaned)
    request.dbsession.add(matakuliah)
    request.dbsession.flush()  # agar id hasil autoincrement terisi

    request.response.status = 201
    return {
        'status': 'success',
        'message': 'Mata kuliah berhasil ditambahkan.',
        'data': matakuliah.to_dict(),
    }


@view_config(route_name='matakuliah_update', renderer='json')
def update_matakuliah(request):
    """PUT /api/matakuliah/{id} - perbarui data mata kuliah."""
    matakuliah = _get_or_404(request)
    cleaned = _validate_payload(_get_json_body(request), partial=True)

    if not cleaned:
        raise _bad_request(
            'Sertakan minimal satu field yang akan diperbarui.',
            fields=list(REQUIRED_FIELDS))

    if 'kode_mk' in cleaned and _kode_exists(
            request.dbsession, cleaned['kode_mk'], exclude_id=matakuliah.id):
        raise _bad_request(
            'kode_mk {} sudah digunakan.'.format(cleaned['kode_mk']))

    for field, value in cleaned.items():
        setattr(matakuliah, field, value)
    request.dbsession.flush()

    return {
        'status': 'success',
        'message': 'Mata kuliah berhasil diperbarui.',
        'data': matakuliah.to_dict(),
    }


@view_config(route_name='matakuliah_delete', renderer='json')
def delete_matakuliah(request):
    """DELETE /api/matakuliah/{id} - hapus mata kuliah."""
    matakuliah = _get_or_404(request)
    deleted = matakuliah.to_dict()
    request.dbsession.delete(matakuliah)

    return {
        'status': 'success',
        'message': 'Mata kuliah berhasil dihapus.',
        'data': deleted,
    }
