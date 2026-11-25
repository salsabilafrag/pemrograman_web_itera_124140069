from sqlalchemy import CheckConstraint, Column, Integer, Text

from .meta import Base


class Matakuliah(Base):
    """Model data mata kuliah."""

    __tablename__ = 'matakuliah'
    __table_args__ = (
        CheckConstraint('sks > 0', name='sks_positif'),
        CheckConstraint('semester > 0', name='semester_positif'),
    )

    id = Column(Integer, primary_key=True, autoincrement=True)
    kode_mk = Column(Text, unique=True, nullable=False)
    nama_mk = Column(Text, nullable=False)
    sks = Column(Integer, nullable=False)
    semester = Column(Integer, nullable=False)

    def to_dict(self):
        """Serialisasi objek menjadi dictionary yang siap dijadikan JSON."""
        return {
            'id': self.id,
            'kode_mk': self.kode_mk,
            'nama_mk': self.nama_mk,
            'sks': self.sks,
            'semester': self.semester,
        }
