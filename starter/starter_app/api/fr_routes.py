from flask import Blueprint, request
from starter_app.models import db, User, FR_Question, FR_Response


fr_routes = Blueprint('fr_questions', __name__)


@fr_routes.route('/all')
def all_fr_questions():
    fr_questions = FR_Question.query.all()
    return {'fr_all': [question.to_dict() for question in fr_questions]}


@fr_routes.route('/answered/<int:user_id>')
def answered_fr_questions(user_id):
    fr_responses = FR_Response.query.filter(FR_Response.user_id == user_id).join(FR_Question).options(
        db.joinedload(FR_Response.fr_question)).all()
    return {'fr_answered': [fr_response.to_dict() for fr_response in fr_responses]}


@fr_routes.route('/unanswered/<int:user_id>')
def unanswered_fr_questions(user_id):
    answered_fr_question_ids = [value for value, in FR_Response.query.filter(
        FR_Response.user_id == user_id).with_entities(FR_Response.fr_question_id)]

    unanswered_fr_questions = FR_Question.query.filter(FR_Question.id.notin_(answered_fr_question_ids)).all()

    return {'fr_unanswered': [question.to_dict() for question in unanswered_fr_questions]}

@fr_routes.route('/<int:user_id>/answer', methods=['POST'])
def update_fr_response(user_id):
    data = request.json
    question_id = data['question_id']
    response = data['response']
    response_id = data['response_id']
    # if response exists, update
    if response_id:
        fr_response = FR_Response.query.get(response_id)
        fr_response.fr_answer = response
    # if response doesn't exist, create it
    else:
        fr_response = FR_Response(user_id=user_id, fr_question_id=question_id, fr_answer=response)
    db.session.add(fr_response)
    db.session.commit()
    return 'ok'

@fr_routes.route('/answer/<int:user_id>/q<int:question_id>', methods=['POST'])
def answer_fr_question(user_id, question_id):
    answer = request.form
    fr_response = FR_Response(user_id=user_id, fr_question_id=question_id, fr_answer=answer)
    db.session.add(fr_response)
    db.session.commit()
    print(fr_response)
