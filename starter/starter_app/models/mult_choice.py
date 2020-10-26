from . import db


class MC_Response(db.Model):
    __tablename__ = 'mc_responses'

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.ForeignKey(
        'users.id', ondelete='cascade'), nullable=False)

    mc_answer_option_id = db.Column(db.ForeignKey(
        'mc_answer_options.id', ondelete='cascade'), nullable=False)

    mc_answer_option = db.relationship(
        'MC_Answer_Option', backref='mc_responses')

    mc_question_id = db.Column(db.ForeignKey(
        'mc_questions.id', ondelete='cascade'), nullable=False)

    mc_question = db.relationship('MC_Question', backref='mc_responses')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'mc_answer_option_id': self.mc_answer_option_id,
            'mc_answer_option': self.mc_answer_option,
            'mc_question_id': self.mc_question_id,
            'mc_question': self.mc_question,
        }


class MC_Question(db.Model):
    __tablename__ = 'mc_questions'

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text, nullable=False)

    mc_answer_options = db.relationship(
        'MC_Answer_Option', back_populates="mc_questions")

    def to_dict(self):
        print(self.mc_answer_options)
        mc_answer_option_list = [answer.to_dict_for_question()
                                 for answer in self.mc_answer_options]
        return {
            'id': self.id,
            'question': self.question,
            'mc_answer_options': mc_answer_option_list,
        }


class MC_Answer_Option(db.Model):
    __tablename__ = 'mc_answer_options'

    id = db.Column(db.Integer, primary_key=True)
    answer = db.Column(db.Text, nullable=False)

    mc_question_id = db.Column(db.ForeignKey(
        'mc_questions.id', ondelete='cascade'), nullable=False)

    mc_questions = db.relationship(
        'MC_Question', back_populates='mc_answer_options')

    def to_dict(self):
        return {
            'id': self.id,
            'answer': self.answer,
            'mc_question_id': self.mc_question_id,
            'mc_questions': self.mc_questions
        }

    def to_dict_for_question(self):
        return {
            'id': self.id,
            'answer': self.answer,
        }
