from . import db, User


class MC_Response(db.Model):
    __tablename__ = 'mc_responses'

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.ForeignKey('users.id', ondelete='cascade'), nullable=False)

    mc_answer_option_id = db.Column(db.ForeignKey('mc_answer_options.id', ondelete='cascade'), nullable=False)

    mc_answer_option = db.relationship('MC_Answer_Option')

    mc_question_id = db.Column(db.ForeignKey('mc_questions.id', ondelete='cascade'), nullable=False)

    mc_question = db.relationship('MC_Question')


class MC_Question(db.Model):
    pass
    __tablename__ = 'mc_questions'

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text, nullable=False)

    mc_answer_options = db.relationship('MC_Answer_Option', back_populates="mc_question")


class MC_Answer_Option(db.Model):
    pass
    __tablename__ = 'mc_answer_options'

    id = db.Column(db.Integer, primary_key=True)
    answer = db.Column(db.Text, nullable=False)

    mc_question_id = db.Column(db.ForeignKey('mc_questions.id', ondelete='cascade'), nullable=False)

    mc_question = db.relationship('MC_Question', back_populates='mc_answer_options')
