from starter_app.models import User, MC_Response, MC_Question, MC_Answer_Option, FR_Response, FR_Question, Match, Message, MatchRequest, Preference, Gender, Pronoun, Photo, Reject
from starter_app import app, db
from faker import Faker
from random import randrange
from dotenv import load_dotenv
load_dotenv()
fake = Faker()
# use this so same fake data generated each time
Faker.seed(420)

# num_fake_users must be at least 4
num_fake_users = 10
num_fake_messages = 10

with app.app_context():
    db.drop_all()
    db.create_all()

####################################################
# SEED PREFERENCES TABLE
####################################################
    p1 = Preference(preference='hookups')
    p2 = Preference(preference='new friends')
    p3 = Preference(preference='short-term dating')
    p4 = Preference(preference='long-term dating')
    p5 = Preference(preference='Monogamy')
    p6 = Preference(preference='Non-Monogamy')

    # use this array for generating random users
    preferences = [p1, p2, p3, p4, p5, p6]
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
    g9 = Gender(gender='man')
    g10 = Gender(gender='woman')

    # use this array for generating random users
    genders = [g3, g4, g5, g6, g7, g8, g9, g10, g1, g2]
    for gender in genders:
        db.session.add(gender)
####################################################
# SEED PRONOUNS TABLE
####################################################
    n1 = Pronoun(pronoun='They/Them/Theirs')
    n2 = Pronoun(pronoun='She/Her/Hers')
    n3 = Pronoun(pronoun='He/Him/His')
    n4 = Pronoun(pronoun='Ze/Hir/Hirs')
    n5 = Pronoun(pronoun='Per/Per/Pers')
    n6 = Pronoun(pronoun='Ve/Ver/Vis')
    n7 = Pronoun(pronoun='Xe, Xem, Xyr')

    # use this array for generating random users
    pronouns = [n1, n2, n3, n4, n5, n6, n7]
    for pronoun in pronouns:
        db.session.add(pronoun)

    db.session.commit()

# commit preferences, genders, and pronouns so we can use them in generating random users

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
    db.session.commit()

    test_reject5 = Reject(user_id=1, reject_id=5)
    test_reject4 = Reject(user_id=1, reject_id=4)
    test_reject3 = Reject(user_id=1, reject_id=3)

    db.session.add(test_reject5)
    db.session.add(test_reject4)
    db.session.add(test_reject3)



####################################################
# GENERATE RANDOM USERS WITH FAKER
####################################################
    # use this list later when adding fake mc/fr responses
    fake_user_list = []
    total_pref = len(preferences)
    for _ in range(num_fake_users):
        first_name = fake.first_name()
        last_name = fake.last_name()
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

    # commit fake users so we can use ids in match request and other tables
    db.session.commit()

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
# SEED MATCHREQUEST AND MATCH WITH FAKES
####################################################
    num_fake_users = len(fake_user_list)
    # keep track of match history - no requests if users matched
    # also - only one user in a pair should send a request
    # initialize match_history object with all user ids as keys and empty array values
    match_history = {fake_user.id: [] for fake_user in fake_user_list}
    # generate fake matches
    #   power should be between 0 and 1!!!!
    #   If power is 1 a user will match with everyone

    def make_fake_match_and_match_req(match_history, power, table):
        for fake_user in fake_user_list:
            fake_user_id = fake_user.id
            # get match array from match history if it exists
            # otherwise, its an empty array
            fake_user_match_array = match_history[fake_user_id]

            num_fake_matches = randrange(1, int(num_fake_users**0.5))
            i = 0
            # j is just in case there's a problem we don't get stuck in inf loop
            j = 0
            while i in range(num_fake_matches) and j in range(num_fake_matches):
                fake_match = fake_user_list[randrange(num_fake_users)]
                # make sure the match is not same as user
                while fake_user_id == fake_match.id:
                    fake_match = fake_user_list[randrange(num_fake_users)]
                # make sure that match not already made
                fake_match_match_array = match_history[fake_match.id]
                if fake_user_id in fake_match_match_array or fake_match.id in fake_user_match_array:
                    j += 1
                    continue
                # if match not already made, make it and add to history
                fake_user_match_array.append(fake_match.id)
                fake_match_match_array.append(fake_user.id)
                match_history[fake_match.id] = [*fake_match_match_array]
                i += 1
                j += 1

                data = {'from_id': fake_match.id, 'to_id': fake_user.id} if table == MatchRequest else {
                    'users': [fake_user, fake_match], 'status': True}
                fake_match = table(**data)
                db.session.add(fake_match)
            # we update fake_user's match array here so set attr isn't called as often
            match_history[fake_user_id] = [*fake_user_match_array]
        return match_history

    # generate fake matches and match requests
    # match_history here is used in generating fake messages - users must be matched in order to message
    fake_match_history = {**make_fake_match_and_match_req(
        match_history, 0.5, Match)}
    make_fake_match_and_match_req(match_history, 0.2, MatchRequest)


####################################################
####################################################
# MULTIPLE CHOICE
####################################################
####################################################

####################################################
# SEED MC QUESTION AND ANSWER OPTIONS TABLES
####################################################
# #   MC_Q1
#     mc_q1 = MC_Question(mc_question='How do you feel about cats?')
#     mc_q1_a1 = MC_Answer_Option(mc_answer='I love cats.', mc_question_id=1)
#     mc_q1_a2 = MC_Answer_Option(mc_answer='I hate cats.', mc_question_id=1)
#     mc_q1_a3 = MC_Answer_Option(
#         mc_answer='I have no strong feelings regarding cats.', mc_question_id=1)
#     mc_q1_a4 = MC_Answer_Option(
#         mc_answer='I would prefer to keep my opinion on cats private.', mc_question_id=1)

#     mc_qa_1 = {'q': mc_q1, 'a': [mc_q1_a1, mc_q1_a2, mc_q1_a3, mc_q1_a4]}

# #   MC_Q2
#     mc_q2 = MC_Question(mc_question='How do you feel about dogs?')
#     mc_q2_a1 = MC_Answer_Option(mc_answer='I love dogs.', mc_question_id=2)
#     mc_q2_a2 = MC_Answer_Option(mc_answer='I hate dogs.', mc_question_id=2)
#     mc_q2_a3 = MC_Answer_Option(
#         mc_answer='I have no strong feelings regarding dogs.', mc_question_id=2)
#     mc_q2_a4 = MC_Answer_Option(
#         mc_answer='I would prefer to keep my opinion on dogs private.', mc_question_id=2)

#     mc_qa_2 = {'q': mc_q2, 'a': [mc_q2_a1, mc_q2_a2, mc_q2_a3, mc_q2_a4]}

# #   MC_Q3
#     mc_q3 = MC_Question(mc_question='How do you feel about iguanas?')
#     mc_q3_a1 = MC_Answer_Option(mc_answer='I love iguanas.', mc_question_id=3)
#     mc_q3_a2 = MC_Answer_Option(mc_answer='I hate iguanas.', mc_question_id=3)
#     mc_q3_a3 = MC_Answer_Option(
#         mc_answer='I have no strong feelings regarding iguanas.', mc_question_id=3)
#     mc_q3_a4 = MC_Answer_Option(
#         mc_answer='I would prefer to keep my opinion on iguanas private.', mc_question_id=3)

#     mc_qa_3 = {'q': mc_q3, 'a': [mc_q3_a1, mc_q3_a2, mc_q3_a3, mc_q3_a4]}


    def add_mc_qa(question_id, question, *answer_options):
        ###Arguments should be a question id, a question string, and 2 or more answer option strings. Ideally there are 4 answer options but more/less should be ok.###
        q = MC_Question(mc_question=question)
        db.session.add(q)
        for answer_option in answer_options:
            a = MC_Answer_Option(mc_answer=answer_option, mc_question_id=question_id)
            db.session.add(a)

    qa_list = [
        ['q1', 'q1a1', 'q1a2', 'q1a3', 'q1a4'],
        ['q2', 'q2a1', 'q2a2', 'q2a3', 'q2a4'],
        ['q3', 'q3a1', 'q3a2', 'q3a3', 'q3a4'],
        ]
    for i in range(len(qa_list)):
        add_mc_qa(i+1, *qa_list[i])
    db.session.commit()
# ADD MC

    # mc_qa_list = [mc_qa_1, mc_qa_2, mc_qa_3]

    # for mc_qa in mc_qa_list:
    #     q = mc_qa['q']
    #     db.session.add(q)
    #     a_list = mc_qa['a']
    #     for a in a_list:
    #         db.session.add(a)

    # # commit so we can use mc questions for fake users
    # db.session.commit()

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

    # commit so we can use fr questions for fake users
    db.session.commit()

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

    # num_messages is the AVERAGE number of messages sent
    def make_fake_messages(avg_num_messages, users, match_history):
        # send messages for each user
        for user in users:
            id1 = user.id
            # user_matches is an array of all matches - the user they send messages to must be in this array
            user_matches = match_history[id1]
            user_matches_from_db = Match.query.join(Match.users).filter(User.id == id1).all()
            print(user_matches_from_db)
            for _ in range(avg_num_messages):
                rand_idx = randrange(len(user_matches))
                id2 = user_matches[rand_idx]
                # make sure user not messaging themself
                while id2 == id1:
                    rand_idx = randrange(len(user_matches))
                    id2 = user_matches[rand_idx]
                message = fake.text(max_nb_chars=50)
                # alternate between sending/receiving
                from_id = id1 if fake.boolean() else id2
                match_id = None
                for match in user_matches_from_db:
                    pair_id_list = [user.id for user in match.users]
                    if id2 in pair_id_list:
                        match_id = match.id
                        # every now and then it won't find the match id... buggy because I slapped it together.
                        # with msg in this if statement we are guaranteed to have a match id
                        msg = Message(message=message, from_id=from_id, match_id=match_id)
                        db.session.add(msg)
                        break

    make_fake_messages(num_fake_messages, fake_user_list, fake_match_history)




####################################################
# SEED PHOTO TABLE
####################################################


    for i in range (num_fake_users):
        db.session.add(Photo(photo_url='https://while-single-bucket.s3-us-west-2.amazonaws.com/rita-wilson-photo-u24.jpeg', user_id=randrange(1, num_fake_users)) )
        db.session.add(Photo(photo_url='https://while-single-bucket.s3-us-west-2.amazonaws.com/ThuOct291654392020.png', user_id=randrange(1, num_fake_users)) )
        db.session.add(Photo(photo_url='https://while-single-bucket.s3-us-west-2.amazonaws.com/ThuOct291519152020.png', user_id=randrange(1, num_fake_users)) )
        db.session.add(Photo(photo_url='https://while-single-bucket.s3-us-west-2.amazonaws.com/ThuOct291710322020.png', user_id=randrange(1, num_fake_users)) )
        db.session.add(Photo(photo_url='https://while-single-two.s3-us-west-2.amazonaws.com/SunNov11437042020.png', user_id=randrange(1, num_fake_users)) )
        db.session.add(Photo(photo_url = 'https://while-single-two.s3-us-west-2.amazonaws.com/SunNov11446152020.png', user_id=randrange(1, num_fake_users)) )
        db.session.add(Photo(photo_url = 'https://while-single-two.s3-us-west-2.amazonaws.com/SunNov11448092020.png', user_id=randrange(1, num_fake_users)) )
        db.session.add(Photo(photo_url = 'https://while-single-two.s3-us-west-2.amazonaws.com/SunNov11450292020.png', user_id=randrange(1, num_fake_users)) )
        db.session.add(Photo(photo_url = 'https://while-single-two.s3-us-west-2.amazonaws.com/SunNov11453242020.png', user_id=randrange(1, num_fake_users)) )
        db.session.add(Photo(photo_url = 'https://while-single-two.s3-us-west-2.amazonaws.com/SunNov11507092020.png', user_id=randrange(1, num_fake_users)) )




####################################################
# COMMIT DB CHANGES
####################################################
    db.session.commit()
