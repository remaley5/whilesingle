from starter_app.models import User, MC_Response, MC_Question, MC_Answer_Option
from starter_app import app, db
from dotenv import load_dotenv
load_dotenv()


with app.app_context():
    db.drop_all()
    db.create_all()


# SEED USER TABLE
    ian = User(username='Ian', email='ian@aa.io')
    javier = User(username='Javier', email='javier@aa.io')
    dean = User(username='Dean', email='dean@aa.io')
    angela = User(username='Angela', email='angela@aa.io')
    soonmi = User(username='Soon-Mi', email='soonmi@aa.io')
    alissa = User(username='Alissa', email='alissa@aa.io')

    db.session.add(ian)
    db.session.add(javier)
    db.session.add(dean)
    db.session.add(angela)
    db.session.add(soonmi)
    db.session.add(alissa)


# SEED MC TABLE

    mc_q1 = MC_Question(question='How do you feel about cats?')

    mc_q1_a1 = MC_Answer_Option(answer='I love cats.', mc_question_id=1)
    mc_q1_a2 = MC_Answer_Option(answer='I hate cats.', mc_question_id=1)
    mc_q1_a3 = MC_Answer_Option(
        answer='I have no strong feelings regarding cats.', mc_question_id=1)
    mc_q1_a4 = MC_Answer_Option(
        answer='I would prefer to keep my opinion on cats private.', mc_question_id=1)

    db.session.add(mc_q1)
    db.session.commit()


    db.session.add(mc_q1_a1)
    db.session.add(mc_q1_a2)
    db.session.add(mc_q1_a3)
    db.session.add(mc_q1_a4)
    db.session.commit()



    mc_q1_res = MC_Response(user_id=1, mc_answer_option_id=1, mc_question_id=1)

    db.session.add(mc_q1_res)
    db.session.commit()
