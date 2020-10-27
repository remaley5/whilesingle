from starter_app.models import User, MC_Response, MC_Question, MC_Answer_Option, FR_Response, FR_Question, Match, Message
from starter_app import app, db
from dotenv import load_dotenv
load_dotenv()


with app.app_context():
    db.drop_all()
    db.create_all()

####################################################
# SEED USER TABLE
####################################################
    ian = User(first_name='Ian', last_name='Dude', email='ian@aa.io')
    javier = User(first_name='Javier', last_name='Dude', email='javier@aa.io')
    dean = User(first_name='Dean', last_name='Dude', email='dean@aa.io')
    angela = User(first_name='Angela', last_name='Dude', email='angela@aa.io')
    soonmi = User(first_name='Soon-Mi', last_name='Dude', email='soonmi@aa.io')
    alissa = User(first_name='Alissa', last_name='Dude', email='alissa@aa.io')

    db.session.add(ian)
    db.session.add(javier)
    db.session.add(dean)
    db.session.add(angela)
    db.session.add(soonmi)
    db.session.add(alissa)

####################################################
####################################################
# MULTIPLE CHOICE
####################################################
####################################################

####################################################
# SEED MC QUESTION AND ANSWER OPTIONS TABLES
####################################################
#   MC_Q1
    mc_q1 = MC_Question(mc_question='How do you feel about cats?')
    mc_q1_a1 = MC_Answer_Option(mc_answer='I love cats.', mc_question_id=1)
    mc_q1_a2 = MC_Answer_Option(mc_answer='I hate cats.', mc_question_id=1)
    mc_q1_a3 = MC_Answer_Option(
        mc_answer='I have no strong feelings regarding cats.', mc_question_id=1)
    mc_q1_a4 = MC_Answer_Option(
        mc_answer='I would prefer to keep my opinion on cats private.', mc_question_id=1)

    db.session.add(mc_q1)
    db.session.add(mc_q1_a1)
    db.session.add(mc_q1_a2)
    db.session.add(mc_q1_a3)
    db.session.add(mc_q1_a4)

#   MC_Q2
    mc_q2 = MC_Question(mc_question='How do you feel about dogs?')
    mc_q2_a1 = MC_Answer_Option(mc_answer='I love dogs.', mc_question_id=2)
    mc_q2_a2 = MC_Answer_Option(mc_answer='I hate dogs.', mc_question_id=2)
    mc_q2_a3 = MC_Answer_Option(
        mc_answer='I have no strong feelings regarding dogs.', mc_question_id=2)
    mc_q2_a4 = MC_Answer_Option(
        mc_answer='I would prefer to keep my opinion on dogs private.', mc_question_id=2)

    db.session.add(mc_q2)
    db.session.add(mc_q2_a1)
    db.session.add(mc_q2_a2)
    db.session.add(mc_q2_a3)
    db.session.add(mc_q2_a4)

#   MC_Q3
    mc_q3 = MC_Question(mc_question='How do you feel about iguanas?')
    mc_q3_a1 = MC_Answer_Option(mc_answer='I love iguanas.', mc_question_id=3)
    mc_q3_a2 = MC_Answer_Option(mc_answer='I hate iguanas.', mc_question_id=3)
    mc_q3_a3 = MC_Answer_Option(
        mc_answer='I have no strong feelings regarding iguanas.', mc_question_id=3)
    mc_q3_a4 = MC_Answer_Option(
        mc_answer='I would prefer to keep my opinion on iguanas private.', mc_question_id=3)

    db.session.add(mc_q3)
    db.session.add(mc_q3_a1)
    db.session.add(mc_q3_a2)
    db.session.add(mc_q3_a3)
    db.session.add(mc_q3_a4)

####################################################
# SEED MC RESPONSE TABLE
####################################################
    u1_mc_q1_res = MC_Response(
        user_id=1, mc_answer_option_id=1, mc_question_id=1)
    u1_mc_q2_res = MC_Response(
        user_id=1, mc_answer_option_id=8, mc_question_id=2)
    u2_mc_q3_res = MC_Response(
        user_id=2, mc_answer_option_id=12, mc_question_id=3)

    db.session.add(u1_mc_q1_res)
    db.session.add(u1_mc_q2_res)
    db.session.add(u2_mc_q3_res)

####################################################
####################################################
# FREE RESPONSE
####################################################
####################################################

####################################################
# SEED FR QUESTION TABLE
####################################################
#   FR_Q1
    fr_q1 = FR_Question(
        fr_question='How many cats do you have, and do you want 50?')

    db.session.add(fr_q1)

####################################################
# SEED FR RESPONSE TABLE
####################################################
    u1_fr_q1_res = FR_Response(
        user_id=1, fr_answer='I have 17 but dream of the day I have 50.', fr_question_id=1)
    u3_fr_q1_res = FR_Response(user_id=3, fr_answer='My name is Dean and I would like to have as many cats as I have toes.', fr_question_id=1)

    db.session.add(u1_fr_q1_res)
    db.session.add(u3_fr_q1_res)



####################################################
####################################################
# MATCHES AND MESSAGES
####################################################
####################################################

####################################################
# SEED MATCH TABLE
####################################################
    match1 = Match(users=[ian, javier])
    db.session.add(match1)


####################################################
# SEED MESSAGE TABLE
####################################################
    msg1 = Message(message='hello Ian it is your friend, Javier.', from_id=2, match_id=1)
    db.session.add(msg1)

####################################################
# COMMIT DB CHANGES
####################################################
    db.session.commit()
