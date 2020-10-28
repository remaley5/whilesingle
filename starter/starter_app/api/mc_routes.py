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

# note that match_id refers to another user_id but that the user
# does NOT have to be matched with that person
# this route should return the match % between user_id and match_id
# this is based on common mc responses
# later I will add mc response weighting based on user input
@mc_routes.route('/user/<int:user_id>/match/<int:match_id>')
def calc_match(user_id, match_id):
    # get weighting from request.json in the future
    print(type(user_id), match_id)
    # get question and answer ids for user's mc responses
    user_responses = MC_Response.query.filter(MC_Response.user_id == user_id).with_entities(MC_Response.mc_question_id, MC_Response.mc_answer_id).all()

    # res[0] is question_id, res[1] is answer_id
    user_res_obj = {res[0]: res[1] for res in user_responses}
    user_question_ids = list(user_res_obj.keys())
    user_question_ids_set = set(user_res_obj.keys())

    match_responses = MC_Response.query.filter(MC_Response.user_id == match_id).with_entities(MC_Response.mc_question_id, MC_Response.mc_answer_id).all()
    match_res_obj = {res[0]: res[1] for res in match_responses}
    match_question_ids = list(match_res_obj.keys())
    match_question_ids_set = set(match_res_obj.keys())

    # these are the questions that both users have answered
    common_question_ids = list(user_question_ids_set.intersection(match_question_ids_set))

    # for the questions that both users answered, we now want to check for which questions their answers were the same
    # later we will update the total to account for weighting
    total = len(common_question_ids)
    count = 0
    for i in range(len(common_question_ids)):
        question_id = common_question_ids[i]
        if user_res_obj[question_id] == match_res_obj[question_id]:
            # later on we will factor in weighting
            count += 1
    match_percent = count/total * 100 if total > 0 else 0


    # IDEA - to do weighting, we can have a weight property set on each MC_Response instance that defaults to 1. The user can change this in the mc form. we can grab this weight and put it in the user_res object and use it as a multiplier

    # print(user_responses)
    return {'user_res_obj': user_res_obj,
            'user_question_ids': user_question_ids,
            'match_res_obj': match_res_obj,
            'match_question_ids': match_question_ids,
            'common_question_ids': common_question_ids,
            'match_percent': match_percent
            }
    # return 'ok'
