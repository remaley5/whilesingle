from flask import Blueprint, request
from starter_app.models import db, MC_Question, MC_Answer_Option, MC_Response


mc_routes = Blueprint('mc_questions', __name__)


@mc_routes.route('/all')
def all_mc_questions():
    mc_questions = MC_Question.query.all()
    return {'mc_all': [question.to_dict() for question in mc_questions]}


@mc_routes.route('/answered/<int:user_id>')
def answered_mc_questions(user_id):
    mc_responses = MC_Response.query.filter(MC_Response.user_id == user_id).join(MC_Question, MC_Answer_Option).options(
        db.joinedload(MC_Response.mc_question), db.joinedload(MC_Response.mc_answer_option)).all()
    data = []
    if len(mc_responses) != 0:
        data = [mc_response.to_dict() for mc_response in mc_responses]
    return {'mc_answered': data}


# this route serves up data in the same format as /api/mc/questions except only those unanswered
@mc_routes.route('/unanswered/<int:user_id>')
def unanswered_mc_questions(user_id):
    answered_mc_question_ids = [value for value, in MC_Response.query.filter(
        MC_Response.user_id == user_id).with_entities(MC_Response.mc_question_id)]

    unanswered_mc_questions = MC_Question.query.filter(MC_Question.id.notin_(answered_mc_question_ids)).join(
        MC_Answer_Option).options(db.joinedload(MC_Question.mc_answer_options)).all()
    data = []
    if len(unanswered_mc_questions) != 0:
        data = [question.to_dict() for question in unanswered_mc_questions]
    return {'mc_unanswered': data}


@mc_routes.route('/<int:user_id>/answer', methods=['POST'])
def update_mc_response(user_id):
    data = request.json
    question_id = data['question_id']
    answer_option_id = data['answer_option_id']
    old_response = MC_Response.query.filter(MC_Response.user_id == user_id).filter(
        MC_Response.mc_question_id == question_id).one_or_none()
    # if old response exists, update/delete it based on if response not empty
    if old_response:
        old_response.mc_answer_option_id = answer_option_id
        db.session.add(old_response)
    # if old response doesn't exist, create it if response not empty
    else:
        mc_response = MC_Response(
            user_id=user_id, mc_question_id=question_id, mc_answer_option_id=answer_option_id)
        db.session.add(mc_response)

    db.session.commit()
    return 'ok'
