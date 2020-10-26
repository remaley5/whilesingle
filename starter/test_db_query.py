from starter_app import app, db
from starter_app.models import User, MC_Response, MC_Question, MC_Answer_Option

# , MC_Question, MC_Response, MC_Answer_Option

with app.app_context():

# query to get a users MC answers and questions.
#   uses ONE sql query.
    def get_users_answered_mc_questions_and_answers(user_id):
        responses = MC_Response.query.filter(MC_Response.user_id == user_id).join(MC_Question, MC_Answer_Option).options(
            db.joinedload(MC_Response.mc_question), db.joinedload(MC_Response.mc_answer_option)).all()

        print('----------------------------------------')
        print('get_users_answered_mc_questions_and_answers')
        print('userid:', user_id)
        for response in responses:
            print('question:', response.mc_question.question)
            print('\t', 'answer:', response.mc_answer_option.answer)
        return responses


    def get_users_unanswered_mc_questions_with_answer_options(user_id):
        # the query itself returns values in format [(val, ), (val, )].
        # List comprehension used to get a single list output
        answered_question_ids = [value for value, in MC_Response.query.filter(MC_Response.user_id == user_id).with_entities(MC_Response.mc_question_id)]

        unanswered_questions = MC_Question.query.filter(MC_Question.id.notin_(answered_question_ids)).join(MC_Answer_Option).options(db.joinedload(MC_Question.mc_answer_options)).all()

        print('----------------------------------------')
        print('get_users_unanswered_mc_questions_with_answer_options')
        print('userid:', user_id)
        for question in unanswered_questions:
            print(question.question)
            for answer in question.mc_answer_options:
                print("\t", answer.answer)
        return unanswered_questions


    def get_all_mc_questions_and_answers():
        questions_and_answers = MC_Question.query.join(MC_Answer_Option).options(db.joinedload(MC_Question.mc_answer_options)).all()

        print('----------------------------------------')
        print('get_all_mc_questions_and_answers')
        for question in questions_and_answers:
            print(question.question)
            for answer in question.mc_answer_options:
                print("\t", answer.answer)
        return questions_and_answers

    get_all_mc_questions_and_answers()
    get_users_answered_mc_questions_and_answers(1)
    get_users_unanswered_mc_questions_with_answer_options(1)
    get_users_answered_mc_questions_and_answers(2)
    get_users_unanswered_mc_questions_with_answer_options(2)
