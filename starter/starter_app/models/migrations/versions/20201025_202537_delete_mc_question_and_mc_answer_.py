"""delete mc_question and mc_answer_options-test

Revision ID: cce59c7d298a
Revises: 68a1d9785243
Create Date: 2020-10-25 20:25:37.948368

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cce59c7d298a'
down_revision = '68a1d9785243'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('mc_answer_options_mc_question_id_fkey', 'mc_answer_options', type_='foreignkey')
    op.drop_column('mc_answer_options', 'answer')
    op.drop_column('mc_answer_options', 'mc_question_id')
    op.drop_column('mc_questions', 'question')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('mc_questions', sa.Column('question', sa.TEXT(), autoincrement=False, nullable=False))
    op.add_column('mc_answer_options', sa.Column('mc_question_id', sa.INTEGER(), autoincrement=False, nullable=False))
    op.add_column('mc_answer_options', sa.Column('answer', sa.TEXT(), autoincrement=False, nullable=False))
    op.create_foreign_key('mc_answer_options_mc_question_id_fkey', 'mc_answer_options', 'mc_questions', ['mc_question_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###