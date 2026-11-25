"""create matakuliah table

Revision ID: 8b6d4e2a5c91
Revises: 3f1a9c7b2d10
Create Date: 2026-11-12 10:00:00

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '8b6d4e2a5c91'
down_revision = '3f1a9c7b2d10'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'matakuliah',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('kode_mk', sa.Text(), nullable=False),
        sa.Column('nama_mk', sa.Text(), nullable=False),
        sa.Column('sks', sa.Integer(), nullable=False),
        sa.Column('semester', sa.Integer(), nullable=False),
        sa.CheckConstraint('sks > 0', name=op.f('ck_matakuliah_sks_positif')),
        sa.CheckConstraint(
            'semester > 0', name=op.f('ck_matakuliah_semester_positif')),
        sa.PrimaryKeyConstraint('id', name=op.f('pk_matakuliah')),
        sa.UniqueConstraint('kode_mk', name=op.f('uq_matakuliah_kode_mk')),
    )


def downgrade():
    op.drop_table('matakuliah')
