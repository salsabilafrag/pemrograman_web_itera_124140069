from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker
import zope.sqlalchemy

from .meta import Base
from .mahasiswa import Mahasiswa
from .matakuliah import Matakuliah

__all__ = ['Base', 'Mahasiswa', 'Matakuliah']


def get_engine(settings, prefix='sqlalchemy.'):
    return engine_from_config(settings, prefix)


def get_session_factory(engine):
    factory = sessionmaker()
    factory.configure(bind=engine)
    return factory


def get_tm_session(session_factory, transaction_manager, request=None):
    """Buat session SQLAlchemy yang terikat pada transaction manager."""
    dbsession = session_factory(info={'request': request})
    zope.sqlalchemy.register(
        dbsession, transaction_manager=transaction_manager)
    return dbsession


def includeme(config):
    """Inisialisasi koneksi database dan sediakan ``request.dbsession``."""
    settings = config.get_settings()
    settings['tm.manager_hook'] = 'pyramid_tm.explicit_manager'

    config.include('pyramid_tm')
    config.include('pyramid_retry')

    session_factory = get_session_factory(get_engine(settings))
    config.registry['dbsession_factory'] = session_factory

    config.add_request_method(
        lambda request: get_tm_session(session_factory, request.tm),
        'dbsession',
        reify=True,
    )
