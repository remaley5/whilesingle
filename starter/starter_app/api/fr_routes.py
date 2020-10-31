from flask import Blueprint, request
from starter_app.models import db, User, FR_Question, FR_Response
from flask_login import login_required


fr_routes = Blueprint('fr_questions', __name__)


@fr_routes.route('/all')
@login_required
def all_fr_questions():
    fr_questions = FR_Question.query.all()
    return {'fr_all': [question.to_dict() for question in fr_questions]}


@fr_routes.route('/answered/<int:user_id>')
@login_required
def answered_fr_questions(user_id):
    resArr = FR_Response.query.filter(FR_Response.user_id == user_id).join(
        FR_Question).options(db.joinedload(FR_Response.fr_question)).all()
    return {'fr_answered': [fr_response.to_dict() for fr_response in resArr]}


@fr_routes.route('/unanswered/<int:user_id>')
@login_required
def unanswered_fr_questions(user_id):
    answered_fr_question_ids = [value for value, in FR_Response.query.filter(
        FR_Response.user_id == user_id)
        .with_entities(FR_Response.fr_question_id)]

    unanswered = FR_Question.query.filter(
        FR_Question.id.notin_(answered_fr_question_ids)).all()

    return {'fr_unanswered': [question.to_dict() for question in unanswered]}


@fr_routes.route('/<int:id>/answers', methods=['POST'])
@login_required
# id is user_id
def update_fr_response(id):
    data = request.json
    for question_id, response in data.items():
        question_id = int(question_id)
        # response = obj['response']

        old_response = FR_Response.query.filter(FR_Response.user_id == id).filter(
            FR_Response.fr_question_id == question_id).one_or_none()
        # if old response exists, update/delete it based on if response not empty
        if old_response:
            if response != '':
                old_response.fr_answer = response
                db.session.add(old_response)
            else:
                db.session.delete(old_response)
        # if old response doesn't exist, create it if response not empty
        elif response != '':
            fr_response = FR_Response(
                user_id=id, fr_question_id=question_id, fr_answer=response)
            db.session.add(fr_response)

    db.session.commit()
    return 'ok'
