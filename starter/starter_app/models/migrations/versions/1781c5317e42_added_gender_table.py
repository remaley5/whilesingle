"""added gender table

Revision ID: 1781c5317e42
Revises: 5497d0989545
Create Date: 2020-10-29 16:47:23.340732

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1781c5317e42'
down_revision = '5497d0989545'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('genders',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('gender', sa.String(length=40), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('users', sa.Column('gender_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'users', 'genders', ['gender_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'users', type_='foreignkey')
    op.drop_column('users', 'gender_id')
    op.drop_table('genders')
    # ### end Alembic commands ###
