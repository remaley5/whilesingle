from . import db, FR_Response, fake

def seed_fr_responses(fake_user_list, fr_q_list):
    u1_fr_q1_res = FR_Response(
        user_id=1, fr_answer='I have 17 but dream of the day I have 50.', fr_question_id=1)
    u1_fr_q2_res = FR_Response(
        user_id=1, fr_answer='Idk try turning it off.', fr_question_id=2)
    u3_fr_q1_res = FR_Response(
        user_id=3, fr_answer='My name is Dean and I would like to have as many cats as I have toes.', fr_question_id=1)

    fr_res_list = [u1_fr_q1_res, u1_fr_q2_res, u3_fr_q1_res]

    for fr_res in fr_res_list:
        db.session.add(fr_res)

####################################################
# SEED FR_RESPONSES WITH FAKES
####################################################

    # go through all fake users
    for fake_user in fake_user_list:
        user_id = fake_user.id
        # go through all fr questions
        for fr_q in fr_q_list:
            # answer fr questions randomly
            if fake.boolean():
                fr_question_id = fr_q.id
                fr_answer = fake.text()
                fake_res = FR_Response(
                    user_id=user_id, fr_question_id=fr_question_id, fr_answer=fr_answer)
                db.session.add(fake_res)
    db.session.commit()
