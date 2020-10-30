from starter_app.models import User, MC_Response, MC_Question, MC_Answer_Option, FR_Response, FR_Question, Match, Message, MatchRequest, Preference, Gender, Pronoun
from starter_app import app, db
from faker import Faker
from random import randrange
from dotenv import load_dotenv
load_dotenv()
fake = Faker()
# use this so same fake data generated each time
Faker.seed(420)


with app.app_context():
    db.drop_all()
    db.create_all()

####################################################
# SEED PREFERENCES TABLE
####################################################
    p1 = Preference(preference='Gay')
    p2 = Preference(preference='Androgynous')
    p3 = Preference(preference='Single')
    p4 = Preference(preference='Monogamy')
    p5 = Preference(preference='Non-Monogamy')

    # use this array for generating random users
    preferences = [p1, p2, p3, p4, p5]
    for preference in preferences:
        db.session.add(preference)

####################################################
# SEED GENDERS TABLE
####################################################
    g1 = Gender(gender='cis man')
    g2 = Gender(gender='cis woman')
    g3 = Gender(gender='trans man')
    g4 = Gender(gender='trans woman')
    g5 = Gender(gender='non-binary')
    g6 = Gender(gender='genderqueer')
    g7 = Gender(gender='gender fluid')
    g8 = Gender(gender='gender neutral')

    # use this array for generating random users
    genders = [g1, g2, g3, g4, g5, g6, g7, g8]
    for gender in genders:
        db.session.add(gender)
####################################################
# SEED PRONOUNS TABLE
####################################################
    n1 = Pronoun(pronoun='They/Them')
    n2 = Pronoun(pronoun='She/Her')
    n3 = Pronoun(pronoun='He/Him')

    # use this array for generating random users
    pronouns = [n1, n2, n3]
    for pronoun in pronouns:
        db.session.add(pronoun)

# commit preferences, genders, and pronouns so we can use them in generating random users
    db.session.commit()

####################################################
# SEED USER TABLE
####################################################
    ian = User(first_name='Ian', last_name='Dude', email='ian@aa.io',
               password='password', preferences=[p1, p3, p5], genders=g1, pronouns=n1)
    javier = User(first_name='Javier', last_name='Dude',
                  email='javier@aa.io', password='password')
    dean = User(first_name='Dean', last_name='Dude',
                email='dean@aa.io', password='password')
    angela = User(first_name='Angela', last_name='Dude',
                  email='angela@aa.io', password='password')
    soonmi = User(first_name='Soon-Mi', last_name='Dude',
                  email='soonmi@aa.io', password='password')
    alissa = User(first_name='Alissa', last_name='Dude',
                  email='alissa@aa.io', password='password')

    db.session.add(ian)
    db.session.add(javier)
    db.session.add(dean)
    db.session.add(angela)
    db.session.add(soonmi)
    db.session.add(alissa)

####################################################
# GENERATE RANDOM USERS WITH FAKER
####################################################
    # use this list later when adding fake mc/fr responses
    fake_user_list = []
    total_pref = len(preferences)
    for i in range(5):
        first_name = fake.unique.first_name()
        last_name = fake.unique.last_name()
        email = fake.unique.email()
        password = 'password'

        gender_id = genders[randrange(len(genders))].id
        pronoun_id = pronouns[randrange(len(pronouns))].id

        location = f'{fake.city()}, {fake.state_abbr(include_territories=False)}'

        bio = fake.text(max_nb_chars=200)

        preference_list = []
        # number of preferences to include
        num_preferences = randrange(1, total_pref)
        for i in range(num_preferences):
            pref_num = randrange(total_pref)
            pref_to_add = preferences[pref_num]
            while pref_to_add in preference_list:
                pref_num = randrange(total_pref)
                pref_to_add = preferences[pref_num]
            preference_list.append(pref_to_add)

        user_info = {'first_name': first_name, 'last_name': last_name,
                     'email': email, 'password': password, 'gender_id': gender_id, 'pronoun_id': pronoun_id, 'location': location, 'preferences': preference_list, 'bio': bio}
        fake_user = User(**user_info)
        fake_user_list.append(fake_user)
        db.session.add(fake_user)

####################################################
# SEED MATCHREQUEST TABLE
####################################################
    ivan_to_javiar = MatchRequest(from_id=1, to_id=2)
    dean_to_javiar = MatchRequest(from_id=3, to_id=2)
    angela_to_javiar = MatchRequest(from_id=4, to_id=2)

    db.session.add(ivan_to_javiar)
    db.session.add(dean_to_javiar)
    db.session.add(angela_to_javiar)

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

    mc_qa_1 = {'q': mc_q1, 'a': [mc_q1_a1, mc_q1_a2, mc_q1_a3, mc_q1_a4]}

#   MC_Q2
    mc_q2 = MC_Question(mc_question='How do you feel about dogs?')
    mc_q2_a1 = MC_Answer_Option(mc_answer='I love dogs.', mc_question_id=2)
    mc_q2_a2 = MC_Answer_Option(mc_answer='I hate dogs.', mc_question_id=2)
    mc_q2_a3 = MC_Answer_Option(
        mc_answer='I have no strong feelings regarding dogs.', mc_question_id=2)
    mc_q2_a4 = MC_Answer_Option(
        mc_answer='I would prefer to keep my opinion on dogs private.', mc_question_id=2)

    mc_qa_2 = {'q': mc_q2, 'a': [mc_q2_a1, mc_q2_a2, mc_q2_a3, mc_q2_a4]}

#   MC_Q3
    mc_q3 = MC_Question(mc_question='How do you feel about iguanas?')
    mc_q3_a1 = MC_Answer_Option(mc_answer='I love iguanas.', mc_question_id=3)
    mc_q3_a2 = MC_Answer_Option(mc_answer='I hate iguanas.', mc_question_id=3)
    mc_q3_a3 = MC_Answer_Option(
        mc_answer='I have no strong feelings regarding iguanas.', mc_question_id=3)
    mc_q3_a4 = MC_Answer_Option(
        mc_answer='I would prefer to keep my opinion on iguanas private.', mc_question_id=3)

    mc_qa_3 = {'q': mc_q3, 'a': [mc_q3_a1, mc_q3_a2, mc_q3_a3, mc_q3_a4]}

# ADD MC

    mc_qa_list = [mc_qa_1, mc_qa_2, mc_qa_3]

    for mc_qa in mc_qa_list:
        q = mc_qa['q']
        db.session.add(q)
        a_list = mc_qa['a']
        for a in a_list:
            db.session.add(a)

####################################################
# SEED MC RESPONSE TABLE
####################################################
    u1_mc_q1_res = MC_Response(
        user_id=1, mc_answer_id=1, mc_question_id=1, question_weight=2, unacceptable_answers=[2, 3])
    u1_mc_q2_res = MC_Response(
        user_id=1, mc_answer_id=8, mc_question_id=2)

    u2_mc_q1_res = MC_Response(user_id=2, mc_answer_id=1, mc_question_id=1)
    u2_mc_q2_res = MC_Response(user_id=2, mc_answer_id=5, mc_question_id=2)
    u2_mc_q3_res = MC_Response(
        user_id=2, mc_answer_id=12, mc_question_id=3)

    u3_mc_q1_res = MC_Response(user_id=3, mc_answer_id=1, mc_question_id=1)
    u3_mc_q2_res = MC_Response(user_id=3, mc_answer_id=5, mc_question_id=2)


# ADD MC RESPONSES
    mc_res_list = [u1_mc_q1_res, u1_mc_q2_res, u2_mc_q1_res, u2_mc_q2_res,
                   u2_mc_q3_res, u2_mc_q3_res, u3_mc_q1_res, u3_mc_q2_res]

    for mc_res in mc_res_list:
        db.session.add(mc_res)


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
    fr_q2 = FR_Question(
        fr_question='Why is my shit like, all busted?', alt='Have you tried turning it off?')
    fr_q3 = FR_Question(
        fr_question='My current goal',
        alt='Aim high'
    )
    fr_q4 = FR_Question(
        fr_question='My favorite furry friend',
        alt='Fur not required'
    )
    fr_q5 = FR_Question(
        fr_question='I could probably beat you at',
        alt='Go ahead and brag a little, champ'
    )
    fr_q6 = FR_Question(
        fr_question='My golden rule',
        alt='The thing you live by'
    )

# ADD FR QUESTIONS
    fr_q_list = [fr_q1, fr_q2, fr_q3, fr_q4, fr_q5, fr_q6]

    for fr_q in fr_q_list:
        db.session.add(fr_q)

####################################################
# SEED FR RESPONSE TABLE
####################################################
    u1_fr_q1_res = FR_Response(
        user_id=1, fr_answer='I have 17 but dream of the day I have 50.', fr_question_id=1)
    u1_fr_q2_res = FR_Response(
        user_id=1, fr_answer='Idk try turning it off.', fr_question_id=2)
    u3_fr_q1_res = FR_Response(
        user_id=3, fr_answer='My name is Dean and I would like to have as many cats as I have toes.', fr_question_id=1)

# ADD FR RESPONSES
    fr_res_list = [u1_fr_q1_res, u1_fr_q2_res, u3_fr_q1_res]

    for fr_res in fr_res_list:
        db.session.add(fr_res)

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
    msg1 = Message(message='hello Ian it is your friend, Javier.',
                   from_id=2, match_id=1)
    msg2 = Message(message='Hey, Javier! Nice to meet you!',
                   from_id=1, match_id=1)
    db.session.add(msg1)
    db.session.add(msg2)


####################################################
# COMMIT DB CHANGES
####################################################
    db.session.commit()
