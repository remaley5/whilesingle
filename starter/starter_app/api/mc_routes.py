from flask import Blueprint
from starter_app.models import db, MC_Question, MC_Answer_Option, MC_Response


mc_routes = Blueprint('mc_questions', __name__)


@mc_routes.route('/all')
def all_mc_questions():
    mc_questions = MC_Question.query.all()
    return {'all_mc_questions': [question.to_dict() for question in mc_questions]}


@mc_routes.route('/responses/<int:user_id>')
def answered_mc_questions(user_id):
    mc_responses = MC_Response.query.filter(MC_Response.user_id == user_id).join(MC_Question, MC_Answer_Option).options(
        db.joinedload(MC_Response.mc_question), db.joinedload(MC_Response.mc_answer_option)).all()

    return {'mc_responses': [mc_response.to_dict() for mc_response in mc_responses]}


# this route serves up data in the same format as /api/mc/questions except only those unanswered
@mc_routes.route('/unanswered/<int:user_id>')
def unanswered_mc_questions(user_id):
    answered_mc_question_ids = [value for value, in MC_Response.query.filter(
        MC_Response.user_id == user_id).with_entities(MC_Response.mc_question_id)]

    unanswered_mc_questions = MC_Question.query.filter(MC_Question.id.notin_(answered_mc_question_ids)).join(
        MC_Answer_Option).options(db.joinedload(MC_Question.mc_answer_options)).all()

    return {'unanswered_mc_questions': [question.to_dict() for question in unanswered_mc_questions]}
