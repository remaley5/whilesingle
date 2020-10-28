from flask import Blueprint, request
from starter_app.models import db, MC_Question, MC_Answer_Option, MC_Response


mc_routes = Blueprint('mc_questions', __name__)


@mc_routes.route('/all')
def all_mc_questions():
    mc_questions = MC_Question.query.all()
    return {'mc_all': [question.to_dict() for question in mc_questions]}


@mc_routes.route('/answered/<int:id>')
# id is user_id
def answered_mc_questions(id):
    mc_responses = MC_Response.query.filter(
        MC_Response.user_id == id).join(MC_Question, MC_Answer_Option).options(
            db.joinedload(MC_Response.mc_question), db.joinedload(
                MC_Response.mc_answer_options)).all()
    # print(mc_responses)
    data = []
    if mc_responses:
        data = [mc_response.to_dict() for mc_response in mc_responses]
    return {'mc_answered': data}


# this route serves up data in the same format as /api/mc/questions
# except only those unanswered
@mc_routes.route('/unanswered/<int:id>')
# id is user_id
def unanswered_mc_questions(id):
    ans_ids = [value for value, in MC_Response.query.filter(
        MC_Response.user_id == id)
        .with_entities(MC_Response.mc_question_id)]

    unanswered_mc_questions = MC_Question.query.filter(
        MC_Question.id.notin_(ans_ids)).join(MC_Answer_Option).options(
        db.joinedload(MC_Question.mc_answer_options)).all()
    data = []
    if unanswered_mc_questions:
        data = [question.to_dict() for question in unanswered_mc_questions]
    return {'mc_unanswered': data}


@mc_routes.route('/<int:id>/answer', methods=['POST'])
# id is user_id
def update_mc_response(id):
    data = request.json
    question_id = data['question_id']
    answer_id = data['answer_id']
    old_response = MC_Response.query.filter(MC_Response.user_id == id).filter(
        MC_Response.mc_question_id == question_id).one_or_none()
    # if old response exists, update/delete it based on if response not empty
    if old_response:
        old_response.mc_answer_id = answer_id
        db.session.add(old_response)
    # if old response doesn't exist, create it if response not empty
    else:
        mc_response = MC_Response(
            user_id=id, mc_question_id=question_id, mc_answer_id=answer_id)
        db.session.add(mc_response)

    db.session.commit()
    return 'ok'
