"""create mahasiswa table

Revision ID: 3f1a9c7b2d10
Revises:
Create Date: 2026-11-12 09:00:00

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '3f1a9c7b2d10'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'mahasiswa',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('nim', sa.Text(), nullable=False),
        sa.Column('nama', sa.Text(), nullable=False),
        sa.Column('jurusan', sa.Text(), nullable=False),
        sa.Column('angkatan', sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint('id', name=op.f('pk_mahasiswa')),
        sa.UniqueConstraint('nim', name=op.f('uq_mahasiswa_nim')),
    )


def downgrade():
    op.drop_table('mahasiswa')
