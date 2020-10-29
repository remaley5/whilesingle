from flask import Blueprint, request
from starter_app.models import db, MC_Question, MC_Answer_Option, MC_Response
from flask_login import login_required


mc_routes = Blueprint('mc_questions', __name__)


@mc_routes.route('/all')
@login_required
def all_mc_questions():
    mc_questions = MC_Question.query.all()
    return {'mc_all': [question.to_dict() for question in mc_questions]}


@mc_routes.route('/answered/<int:id>')
@login_required
# id is user_id
def answered_mc_questions(id):
    mc_responses = MC_Response.query.filter(
        MC_Response.user_id == id).join(MC_Question, MC_Answer_Option).options(
            db.joinedload(MC_Response.mc_question), db.joinedload(
                MC_Response.mc_answer)).all()
    # print(mc_responses)
    data = []
    if mc_responses:
        data = [mc_response.to_dict() for mc_response in mc_responses]
    print(f'''


    {data}


    ''')
    return {'mc_answered': data}


# this route serves up data in the same format as /api/mc/questions
# except only those unanswered
@mc_routes.route('/unanswered/<int:id>')
@login_required
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
@login_required
# id is user_id
def update_mc_response(id):
    data = request.json
    print(data)
    question_id = data['question_id']
    answer_id = data['answer_id']
    unacceptable = data['unacceptable_answers']
    weight = data['question_weight']
    response = MC_Response.query.filter(MC_Response.user_id == id).filter(
        MC_Response.mc_question_id == question_id).one_or_none()
    # if old response exists, update/delete it based on if response not empty
    if response:
        response.mc_answer_id = answer_id
        response.unacceptable_answers = unacceptable
        response.question_weight = weight
        print('''

        hits response if


        ''')
    # if old response doesn't exist, create it if response not empty
    else:
        response = MC_Response(
            user_id=id, mc_question_id=question_id, mc_answer_id=answer_id, unacceptable_answers=unacceptable, question_weight=weight)
        print('''

        hits response else


        ''')
    print(f'''
    from post

    {response.unacceptable_answers}
    {unacceptable}
    {question_id}
    {weight}
    {answer_id}
    {id}


    ''')
    db.session.add(response)
    db.session.commit()
    return 'ok'

# note that match_id refers to another user_id but that the user
# does NOT have to be matched with that person
# this route should return the match % between user_id and match_id
# this is based on common mc responses
# later I will add mc response weighting based on user input


@mc_routes.route('/user/<int:user_id>/match/<int:match_id>')
def calc_match(user_id, match_id):
    user_responses = MC_Response.query.filter(MC_Response.user_id == user_id).with_entities(
        MC_Response.mc_question_id, MC_Response.mc_answer_id, MC_Response.question_weight, MC_Response.unacceptable_answers).all()

    # res[0] is question_id, res[1] is answer_id
    user_res_obj = {res[0]: {'answer_id': res[1], 'weight': res[2],
                             'unacceptable': res[3]} for res in user_responses}
    user_question_ids_set = set(user_res_obj.keys())

    match_responses = MC_Response.query.filter(MC_Response.user_id == match_id).with_entities(
        MC_Response.mc_question_id, MC_Response.mc_answer_id).all()
    match_res_obj = {res[0]: res[1] for res in match_responses}
    match_question_ids_set = set(match_res_obj.keys())

    # these are the questions that both users have answered
    common_question_ids = list(
        user_question_ids_set.intersection(match_question_ids_set))

    total = 0
    count = 0
    unacceptable = False
    for i in range(len(common_question_ids)):
        question_id = common_question_ids[i]
        user_answer_info = user_res_obj[question_id]
        weight = user_answer_info['weight']
        match_answer_id = match_res_obj[question_id]
        if match_answer_id in user_answer_info['unacceptable']:
            unacceptable = True
            break
        if user_answer_info['answer_id'] == match_answer_id:
            count += weight
        total += weight
    match_percent = int(count/total * 100) if total > 0 and unacceptable is False else 0

    return {'match_percent': match_percent,
            # 'user_res_obj': user_res_obj,
            # 'match_res_obj': match_res_obj,
            # 'common_question_ids': common_question_ids,
            # 'unacceptable': unacceptable,
            }
