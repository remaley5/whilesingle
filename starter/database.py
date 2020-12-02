from starter_app.models import User, MC_Response, MC_Question, MC_Answer_Option, FR_Response, FR_Question, Match, Message, MatchRequest, Preference, Gender, Pronoun, Photo, Reject
from starter_app import app, db
from faker import Faker
from random import randrange
from dotenv import load_dotenv

from database_seed import seed_pronouns, seed_preferences, seed_genders, seed_base_users, seed_random_users, seed_match_and_match_requests, seed_mc_questions, seed_mc_responses

load_dotenv()
# fake = Faker()
# Faker.seed(420)

# num_fake_users must be at least 4
num_fake_users = 10

num_fake_messages = 10



with app.app_context():
    db.drop_all()
    db.create_all()
    # arrays returned from seed functions (preferences, genders, and pronouns) used in generating users (base and random)
    preferences = seed_preferences()
    genders = seed_genders()
    pronouns = seed_pronouns()
    base_users = seed_base_users(preferences, genders, pronouns)

# test rejects - can be put in it's own file later
    test_reject5 = Reject(user_id=1, reject_id=5)
    test_reject4 = Reject(user_id=1, reject_id=4)
    test_reject3 = Reject(user_id=1, reject_id=3)

    db.session.add(test_reject5)
    db.session.add(test_reject4)
    db.session.add(test_reject3)

    random_users = seed_random_users(preferences, genders, pronouns, num_fake_users)
    random_confirmed_match_requests = seed_match_and_match_requests(random_users)


    mc_qa_list = seed_mc_questions()

    seed_mc_responses(random_users, mc_qa_list)
# ####################################################
# ####################################################
# # FREE RESPONSE
# ####################################################
# ####################################################

# ####################################################
# # SEED FR QUESTION TABLE
# ####################################################
# #   FR_Q1
#     fr_q1 = FR_Question(
#         fr_question='How many cats do you have, and do you want 50?')
#     fr_q2 = FR_Question(
#         fr_question='Why is my shit like, all busted?', alt='Have you tried turning it off?')
#     fr_q3 = FR_Question(
#         fr_question='My current goal',
#         alt='Aim high'
#     )
#     fr_q4 = FR_Question(
#         fr_question='My favorite furry friend',
#         alt='Fur not required'
#     )
#     fr_q5 = FR_Question(
#         fr_question='I could probably beat you at',
#         alt='Go ahead and brag a little, champ'
#     )
#     fr_q6 = FR_Question(
#         fr_question='My golden rule',
#         alt='The thing you live by'
#     )

# # ADD FR QUESTIONS
#     fr_q_list = [fr_q1, fr_q2, fr_q3, fr_q4, fr_q5, fr_q6]

#     for fr_q in fr_q_list:
#         db.session.add(fr_q)

#     # commit so we can use fr questions for fake users
#     db.session.commit()

# ####################################################
# # SEED FR RESPONSE TABLE
# ####################################################
#     u1_fr_q1_res = FR_Response(
#         user_id=1, fr_answer='I have 17 but dream of the day I have 50.', fr_question_id=1)
#     u1_fr_q2_res = FR_Response(
#         user_id=1, fr_answer='Idk try turning it off.', fr_question_id=2)
#     u3_fr_q1_res = FR_Response(
#         user_id=3, fr_answer='My name is Dean and I would like to have as many cats as I have toes.', fr_question_id=1)

# # ADD FR RESPONSES
#     fr_res_list = [u1_fr_q1_res, u1_fr_q2_res, u3_fr_q1_res]

#     for fr_res in fr_res_list:
#         db.session.add(fr_res)

# ####################################################
# # SEED FR_RESPONSES WITH FAKES
# ####################################################

#     # go through all fake users
#     for fake_user in fake_user_list:
#         user_id = fake_user.id
#         # go through all fr questions
#         for fr_q in fr_q_list:
#             # answer fr questions randomly
#             if fake.boolean():
#                 fr_question_id = fr_q.id
#                 fr_answer = fake.text()
#                 fake_res = FR_Response(
#                     user_id=user_id, fr_question_id=fr_question_id, fr_answer=fr_answer)
#                 db.session.add(fake_res)

# ####################################################
# ####################################################
# # MATCHES AND MESSAGES
# ####################################################
# ####################################################

# ####################################################
# # SEED MATCH TABLE
# ####################################################
#     match1 = Match(users=[ian, javier])
#     db.session.add(match1)


# ####################################################
# # SEED MESSAGE TABLE
# ####################################################
#     msg1 = Message(message='hello Ian it is your friend, Javier.',
#                    from_id=2, match_id=1)
#     msg2 = Message(message='Hey, Javier! Nice to meet you!',
#                    from_id=1, match_id=1)
#     db.session.add(msg1)
#     db.session.add(msg2)

#     # num_messages is the AVERAGE number of messages sent
#     def make_fake_messages(avg_num_messages, users, match_history):
#         # send messages for each user
#         for user in users:
#             id1 = user.id
#             # user_matches is an array of all matches - the user they send messages to must be in this array
#             user_matches = match_history[id1]
#             user_matches_from_db = Match.query.join(
#                 Match.users).filter(User.id == id1).all()
#             print(user_matches_from_db)
#             for _ in range(avg_num_messages):
#                 rand_idx = randrange(len(user_matches))
#                 id2 = user_matches[rand_idx]
#                 # make sure user not messaging themself
#                 while id2 == id1:
#                     rand_idx = randrange(len(user_matches))
#                     id2 = user_matches[rand_idx]
#                 message = fake.text(max_nb_chars=50)
#                 # alternate between sending/receiving
#                 from_id = id1 if fake.boolean() else id2
#                 match_id = None
#                 for match in user_matches_from_db:
#                     pair_id_list = [user.id for user in match.users]
#                     if id2 in pair_id_list:
#                         match_id = match.id
#                         # every now and then it won't find the match id... buggy because I slapped it together.
#                         # with msg in this if statement we are guaranteed to have a match id
#                         msg = Message(message=message,
#                                       from_id=from_id, match_id=match_id)
#                         db.session.add(msg)
#                         break

#     make_fake_messages(num_fake_messages, fake_user_list, fake_match_history)


# ####################################################
# # SEED PHOTO TABLE
# ####################################################

#     for i in range(num_fake_users):
#         db.session.add(Photo(photo_url='https://while-single-bucket.s3-us-west-2.amazonaws.com/rita-wilson-photo-u24.jpeg',
#                              user_id=randrange(1, num_fake_users)))
#         db.session.add(Photo(photo_url='https://while-single-bucket.s3-us-west-2.amazonaws.com/ThuOct291654392020.png',
#                              user_id=randrange(1, num_fake_users)))
#         db.session.add(Photo(photo_url='https://while-single-bucket.s3-us-west-2.amazonaws.com/ThuOct291519152020.png',
#                              user_id=randrange(1, num_fake_users)))
#         db.session.add(Photo(photo_url='https://while-single-bucket.s3-us-west-2.amazonaws.com/ThuOct291710322020.png',
#                              user_id=randrange(1, num_fake_users)))
#         db.session.add(Photo(photo_url='https://while-single-two.s3-us-west-2.amazonaws.com/SunNov11437042020.png',
#                              user_id=randrange(1, num_fake_users)))
#         db.session.add(Photo(photo_url='https://while-single-two.s3-us-west-2.amazonaws.com/SunNov11446152020.png',
#                              user_id=randrange(1, num_fake_users)))
#         db.session.add(Photo(photo_url='https://while-single-two.s3-us-west-2.amazonaws.com/SunNov11448092020.png',
#                              user_id=randrange(1, num_fake_users)))
#         db.session.add(Photo(photo_url='https://while-single-two.s3-us-west-2.amazonaws.com/SunNov11450292020.png',
#                              user_id=randrange(1, num_fake_users)))
#         db.session.add(Photo(photo_url='https://while-single-two.s3-us-west-2.amazonaws.com/SunNov11453242020.png',
#                              user_id=randrange(1, num_fake_users)))
#         db.session.add(Photo(photo_url='https://while-single-two.s3-us-west-2.amazonaws.com/SunNov11507092020.png',
#                              user_id=randrange(1, num_fake_users)))


# ####################################################
# # COMMIT DB CHANGES
# ####################################################
#     db.session.commit()
