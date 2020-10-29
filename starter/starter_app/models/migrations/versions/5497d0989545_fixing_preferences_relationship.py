"""fixing preferences relationship

Revision ID: 5497d0989545
Revises: dcf42219f826
Create Date: 2020-10-29 15:14:29.261517

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5497d0989545'
down_revision = 'dcf42219f826'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_preferences',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('preference_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['preference_id'], ['preferences.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'preference_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_preferences')
    # ### end Alembic commands ###