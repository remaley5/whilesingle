from flask import Blueprint
from starter_app.models import db, User, FR_Question, FR_Response


fr_routes = Blueprint('fr_questions', __name__)


@fr_routes.route('/all')
def all_fr_questions():
    fr_questions = FR_Question.query.all()
    return [question.to_dict() for question in fr_questions]


@fr_routes.route('/answered/<int:user_id>')
def answered_fr_questions(user_id):
    fr_responses = FR_Response.query.filter(FR_Response.user_id == user_id).join(FR_Question).options(
        db.joinedload(FR_Response.fr_question)).all()
    return [fr_response.to_dict() for fr_response in fr_responses]


@fr_routes.route('/unanswered/<int:user_id>')
def unanswered_fr_questions(user_id):
    answered_fr_question_ids = [value for value, in FR_Response.query.filter(
        FR_Response.user_id == user_id).with_entities(FR_Response.fr_question_id)]

    unanswered_fr_questions = FR_Question.query.filter(FR_Question.id.notin_(answered_fr_question_ids)).all()

    return [question.to_dict() for question in unanswered_fr_questions]
