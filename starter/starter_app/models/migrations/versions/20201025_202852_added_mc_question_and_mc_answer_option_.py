"""added mc_question and mc_answer_option tables

Revision ID: ed279c8fd64e
Revises: cce59c7d298a
Create Date: 2020-10-25 20:28:52.928446

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ed279c8fd64e'
down_revision = 'cce59c7d298a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('mc_answer_options', sa.Column('answer', sa.Text(), nullable=False))
    op.add_column('mc_questions', sa.Column('question', sa.Text(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('mc_questions', 'question')
    op.drop_column('mc_answer_options', 'answer')
    # ### end Alembic commands ###
