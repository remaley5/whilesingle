from . import db


class FR_Response(db.Model):
    __tablename__ = 'fr_responses'

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.ForeignKey(
        'users.id', ondelete='cascade'), nullable=False)

    fr_answer = db.Column(db.Text, nullable=False)

    fr_question_id = db.Column(db.ForeignKey(
        'fr_questions.id', ondelete='cascade'), nullable=False)

    fr_question = db.relationship('FR_Question', backref='fr_responses')

    def to_dict(self):
        return {
            'fr_response_id': self.id,
            'fr_answer': self.fr_answer,
            'fr_question_id': self.fr_question_id,
            'fr_question': self.fr_question.fr_question,
            'fr_alt': self.fr_question.alt
        }


class FR_Question(db.Model):
    __tablename__ = 'fr_questions'

    id = db.Column(db.Integer, primary_key=True)
    fr_question = db.Column(db.Text, nullable=False)
    alt = db.Column(db.String(100), default='Tell us how you feel...')

    def to_dict(self):
        return {
            'fr_question_id': self.id,
            'fr_question': self.fr_question,
            'fr_alt': self.alt
        }
