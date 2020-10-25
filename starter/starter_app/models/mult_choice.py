from . import db, User


class MC_Response(db.Model):
    __tablename__ = 'mc_responses'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.ForeignKey('users.id', ondelete='cascade'), nullable=False)

    mc_answer_option_id = db.Column(db.ForeignKey('mc_answer_options.id', ondelete='cascade'), nullable=False)

    mc_question_id = db.Column(db.ForeignKey('mc_questions.id', ondelete='cascade'), nullable=False)


class MC_Question(db.Model):
    __tablename__ = 'mc_questions'

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text, nullable=False)

    # answer_option_id = db.Column(db.Integer, db.ForeignKey('mc_answer_options.id'))

    # answer_option_id = db.relationship('MC_Answer_Option', foreign_keys='MC_Answer_Option.id', backref=db.backref('mc_questions', lazy='joined'))



class MC_Answer_Option(db.Model):
    __tablename__ = 'mc_answer_options'

    id = db.Column(db.Integer, primary_key=True)
    answer = db.Column(db.Text, nullable=False)

    mc_question_id = db.Column(db.ForeignKey('mc_questions.id', ondelete='cascade'), nullable=False)

    # mc_question_id = db.relationship('MC_Question', foreign_keys='MC_Question.id')
