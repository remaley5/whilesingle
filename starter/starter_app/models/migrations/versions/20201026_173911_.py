"""empty message

Revision ID: 07d7ca01c24f
Revises: 
Create Date: 2020-10-26 17:39:11.009658

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '07d7ca01c24f'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('fr_questions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('fr_question', sa.Text(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('matches',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('mc_questions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('mc_question', sa.Text(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=40), nullable=False),
    sa.Column('last_name', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('first_name'),
    sa.UniqueConstraint('last_name')
    )
    op.create_table('fr_responses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('fr_answer', sa.Text(), nullable=False),
    sa.Column('fr_question_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['fr_question_id'], ['fr_questions.id'], ondelete='cascade'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='cascade'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('match_users',
    sa.Column('match_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['match_id'], ['matches.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('match_id', 'user_id')
    )
    op.create_table('mc_answer_options',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('mc_answer', sa.Text(), nullable=False),
    sa.Column('mc_question_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['mc_question_id'], ['mc_questions.id'], ondelete='cascade'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('messages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('message', sa.String(length=2000), nullable=False),
    sa.Column('from_id', sa.Integer(), nullable=True),
    sa.Column('match_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['match_id'], ['matches.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('mc_responses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('mc_answer_option_id', sa.Integer(), nullable=False),
    sa.Column('mc_question_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['mc_answer_option_id'], ['mc_answer_options.id'], ondelete='cascade'),
    sa.ForeignKeyConstraint(['mc_question_id'], ['mc_questions.id'], ondelete='cascade'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='cascade'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('mc_responses')
    op.drop_table('messages')
    op.drop_table('mc_answer_options')
    op.drop_table('match_users')
    op.drop_table('fr_responses')
    op.drop_table('users')
    op.drop_table('mc_questions')
    op.drop_table('matches')
    op.drop_table('fr_questions')
    # ### end Alembic commands ###