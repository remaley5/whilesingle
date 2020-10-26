from . import db, User


class FR_Response(db.Model):
    __tablename__ = 'fr_responses'

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.ForeignKey(
        'users.id', ondelete='cascade'), nullable=False)

    answer = db.Column(db.Text, nullable=False)

    fr_question_id = db.Column(db.ForeignKey(
        'fr_questions.id', ondelete='cascade'), nullable=False)


class FR_Question(db.Model):
    __tablename__ = 'fr_questions'

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text, nullable=False)
