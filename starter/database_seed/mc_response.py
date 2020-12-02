from . import db, MC_Response
from faker import Faker
from random import randrange
fake = Faker()
# use this so same fake data generated each time
Faker.seed(420)


def seed_mc_responses(fake_user_list, mc_qa_list):


####################################################
# SEED MC RESPONSE TABLE
####################################################
    u1_mc_q2_res = MC_Response(
        user_id=1, mc_answer_id=8, mc_question_id=2)

    u2_mc_q1_res = MC_Response(user_id=2, mc_answer_id=1, mc_question_id=1)
    u2_mc_q2_res = MC_Response(user_id=2, mc_answer_id=5, mc_question_id=2)
    u2_mc_q3_res = MC_Response(
        user_id=2, mc_answer_id=12, mc_question_id=3)

    u3_mc_q1_res = MC_Response(user_id=3, mc_answer_id=1, mc_question_id=1)
    u3_mc_q2_res = MC_Response(user_id=3, mc_answer_id=5, mc_question_id=2)

    # ADD MC RESPONSES
    mc_res_list = [u1_mc_q2_res, u2_mc_q1_res, u2_mc_q2_res,
                   u2_mc_q3_res, u2_mc_q3_res, u3_mc_q1_res, u3_mc_q2_res]

    for mc_res in mc_res_list:
        db.session.add(mc_res)

####################################################
# SEED MC_RESPONSES WITH FAKES
####################################################

    # go through all fake users
    for fake_user in fake_user_list:
        user_id = fake_user.id
        # go through all mc questions
        for mc_qa in mc_qa_list:
            q_id = mc_qa['q'].id
            a_ids = [a.id for a in mc_qa['a']]
            num_answers = len(a_ids)
            # select a random answer
            a_id = a_ids[randrange(num_answers)]
            # add random unacceptable answers
            unacceptable_as = []
            if fake.boolean():
                # for _ in range(randrange(num_answers)):
                # only want to add one or no dealbreakers
                unacceptable_a = a_ids[randrange(num_answers)]
                # while unacceptable_a in unacceptable_as:
                #     unacceptable_a = a_ids[randrange(num_answers)]
                unacceptable_as.append(unacceptable_a)
            # pick random weight between 1 and 3
            # that's what I have on MC page right now; may change.
            weight = randrange(1, 4)
            fake_res = MC_Response(user_id=user_id, mc_answer_id=a_id, mc_question_id=q_id,
                                   unacceptable_answers=unacceptable_as, question_weight=weight)
            db.session.add(fake_res)
    db.session.commit()
