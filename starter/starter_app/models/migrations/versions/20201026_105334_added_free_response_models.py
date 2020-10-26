"""added free response models

Revision ID: 999093af23d7
Revises: fa4f050092c2
Create Date: 2020-10-26 10:53:34.323743

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '999093af23d7'
down_revision = 'fa4f050092c2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('fr_questions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('question', sa.Text(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('fr_responses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('answer', sa.Text(), nullable=False),
    sa.Column('fr_question_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['fr_question_id'], ['fr_questions.id'], ondelete='cascade'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='cascade'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('fr_responses')
    op.drop_table('fr_questions')
    # ### end Alembic commands ###
