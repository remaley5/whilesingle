from . import db


class MC_Response(db.Model):
    __tablename__ = 'mc_responses'

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.ForeignKey(
        'users.id', ondelete='cascade'), nullable=False)

    mc_answer_option_id = db.Column(db.ForeignKey(
        'mc_answer_options.id', ondelete='cascade'), nullable=False)

    mc_answer_option = db.relationship('MC_Answer_Option', backref='mc_responses')

    # mc_answer_options = db.relationship('MC_Answer_Option', backref="mc_responses")


    mc_question_id = db.Column(db.ForeignKey(
        'mc_questions.id', ondelete='cascade'), nullable=False)

    mc_question = db.relationship('MC_Question', backref='mc_responses')

    def to_dict(self):
        # we may want to remove answer_option and question (the actual text) and instead refer to an entry in the store. As it stands now we will have multiple copies of the question/answer data.
        # mc_answer_option_list = [answer.to_dict_for_question_and_response()
        #                          for answer in self.mc_answer_options]
        return {
            'mc_response_id': self.id,
            'mc_answer_option_id': self.mc_answer_option_id,
            'mc_answer_option': self.mc_answer_option.mc_answer,
            'mc_question_id': self.mc_question_id,
            'mc_question': self.mc_question.mc_question,
            # 'mc_answer_options': mc_answer_option_list,
        }


class MC_Question(db.Model):
    __tablename__ = 'mc_questions'

    id = db.Column(db.Integer, primary_key=True)
    mc_question = db.Column(db.Text, nullable=False)

    mc_answer_options = db.relationship(
        'MC_Answer_Option', back_populates="mc_questions")

    def to_dict(self):
        mc_answer_option_list = [answer.to_dict_for_question_and_response()
                                 for answer in self.mc_answer_options]
        return {
            'mc_question_id': self.id,
            'mc_question': self.mc_question,
            'mc_answer_options': mc_answer_option_list,
        }

    def to_dict_for_response(self):
        return {
            'mc_question_id': self.id,
            'mc_question': self.mc_question,
        }


class MC_Answer_Option(db.Model):
    __tablename__ = 'mc_answer_options'

    id = db.Column(db.Integer, primary_key=True)
    mc_answer = db.Column(db.Text, nullable=False)

    mc_question_id = db.Column(db.ForeignKey(
        'mc_questions.id', ondelete='cascade'), nullable=False)

    mc_questions = db.relationship(
        'MC_Question', back_populates='mc_answer_options')

    def to_dict(self):
        return {
            'mc_answer_option_id': self.id,
            'mc_answer': self.mc_answer,
            'mc_question_id': self.mc_question_id,
            'mc_questions': self.mc_questions
        }

    def to_dict_for_question_and_response(self):
        return {
            'mc_answer_id': self.id,
            'mc_answer': self.mc_answer,
        }
