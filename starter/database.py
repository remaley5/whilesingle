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

    def add_single_mc_qa(question_id, question, *answer_options):
        """
        This function adds single mc questions to database.
        Returns a single mc qa object to be later used with fake profiles.

        Parameters:
            question_id (int): question id
            question (string): the question
            answer_options (list(string)): an array of possible answers.
                Ideally 4 answers but more/less ok.
        """
        q = MC_Question(mc_question=question)
        db.session.add(q)
        mc_qa = {'q': q, 'a': []}
        for answer_option in answer_options:
            a = MC_Answer_Option(mc_answer=answer_option,
                                 mc_question_id=question_id)
            mc_qa['a'].append(a)
            db.session.add(a)
        return mc_qa

    def add_all_mc_qa(*raw_qa_list):
        """
        This function adds many question/answers to db.
        Returns a list of qa objects to be used in fake profiles.

        Parameters:
            raw_qa_list (list(list(string))):
                Each subarray contains strings
                First string is question string
                Subsequent strings are answer options - ideally 4
        """
        mc_qa_list = []
        for i in range(len(raw_qa_list)):
            mc_qa = add_single_mc_qa(i+1, *raw_qa_list[i])
            mc_qa_list.append(mc_qa)
        db.session.commit()
        return mc_qa_list

# Our actual questions go in this array.
# First element in each subarray is the question string
# Subsequent elements in subarrays are answer option strings (ideally 4)
# these are from us:
    our_qa_list = [
        [
            'How do you feel about cats?',
            'I love cats.',
            'I hate cats.',
            'I have no strong feelings regarding cats.',
            'I would prefer to keep my opinion on cats private.'
        ],
        [
            'How do you feel about dogs?',
            'I love dogs.',
            'I hate dogs.',
            'I have no strong feelings regarding dogs.',
            'I would prefer to keep my opinion on dogs private.'
        ],
        [
            'How do you feel about iguanas?',
            'I love iguanas.',
            'I hate iguanas.',
            'I have no strong feelings regarding iguanas.',
            'I would prefer to keep my opinion on iguanas private.'
        ],
    ]
# Questions taken from eHarmony

    eharmony_qa_list_1 = [
        [
            'Regardless of where you live now, where would you most like to live?',
            'In a large city',
            'In a suburb',
            'In a small, quiet town',
            'In a rural area',
            'It doesn’t matter where we live, as long as I can do a lot of travelling',
        ],
        # multi-select - up to 3
        [
            'In addition to love and affection, what are your main reasons for wanting a relationship?',
            'Life is easier with a partner',
            'Emotional security',
            'Having a partner I can trust',
            'Frequent intimacy',
            'I want someone to spend my free time with',
            "So I'm not alone",
            'Security',
        ],
        [
            "Your ideal partner should:",
            "Look good with me",
            "Share my interests",
            "Be adorable to me",
        ],
        # exactly 2 answers
        [
            "What is most likely to make you interested in someone?",
            "Their career",
            "Financial security",
            "Health and fitness",
            "Warm-heartedness",
            "Appearance",
        ],
        [
            "Let's say you and your partner have been invited to a friend's wedding. As you get ready for the party, which thoughts are you most likely to be thinking?",
            "Are we going to look good together?",
            "Have we brought the right gift?",
            "Will there be too many people I don't know?",
            "I notice that I really don't like dressing up",
        ],
        [
            "Why do you think you're single?",
            "I have very high expectations of the person I might spend the rest of my life with",
            "I wasn't ready before now",
            "I'm too shy to meet people",
            "I haven't had the time to date",
            "I just don't socialize much",
        ],
        [
            "If you find a book or article particularly interesting, do you want your partner to read it as well?",
            "Yes, I like sharing my interests with my partner",
            "It doesn't matter if they read it or not",
        ],
        [
            "Suppose you lived in a two-bedroom apartment with your partner, what would the sleeping arrangement be?",
            "We'd definitely share one bedroom",
            "Each of us would have our own bedroom, but we could spend the night together in either room",
        ],
        [
            "How do you react to lovesickness?",
            "I don't enjoy my food anymore",
            "I eat more",
            "Neither",
        ],
        [
            "What do you think about cheating in a relationship?",
            "Cheating is never ok!",
            "It's important to try to be faithful",
            "Being true to your heart is much more important than physical fidelity",
            "Flings occasionally happen in relationships",
            "To demand absolute fidelity is possessive thinking",
        ],
        [
            "Which statement best represents your ideal wedding?",
            "Some kind of ceremony or event, maybe at a church or venue",
            "Going to a courthouse would be sufficient for me.",
            "I'm ok with whatever my partner wants to do",
            "I haven't thought about it at all",
        ],
    ]

    eharmony_qa_list_2 = [
        # up to 5 answers
        [
            "What do you want your partner to like about you?",
            "cheerful",
            "humorous",
            "uncomplicated",
            "natural",
            "honest",
            "serious",
            "adaptable",
            "empathetic",
            "affectionate",
            "spirited",
            "reserved",
            "frugal",
            "domestic",
            "nature-loving",
            "optimistic",
            "sporty",
            "capable",
            "fond of children",
            "self-disciplined",
            "attractive",
            "warm-hearted",
            "educated",
            "ethical",
            "well-mannered",
            "thoughtful",
            "independent",
            "tolerant",
            "spontaneous",
            "self-assured",
            "imaginative",
            "career-driven",
            "reliable",
            "calm",
            "understanding",
        ],
        # exactly 2 answers
        [
            "Which of the following do your friends and family think about you?",
            "Always up for anything fun",
            "Always optimistic",
            "Thinks a lot - and seriously - about life",
            "Always happy and in a good mood",
            "Is a bit of a daydreamer",
            "Deals with problems in an objective and thoughtful manner",
            "Always finds a good solution for himself, even in unpleasant situations",
            "Calm and level-headed",
            "Actively participates in everything",
        ],
        # exactly 2 answers
        [
            "What do you think is most important in a relationship?",
            "Giving each other a lot of space",
            "Considering each other in what you want",
            "Not examining everything in depth",
            "Making life easier and peaceful for one another",
            "Accepting our imperfections",
            "Always trying new things",
            "Sticking to a routine",
        ],

        [
            "Imagine your family and friends: Which of the following reactions about your choice of partner would you value the most?",
            "My family's approval of my choice of partner",
            "My friends being pleased about my choice of partner",
            "I really don't care what my family or friends think about my choice of partner",
            "My partner's family liking me",
        ],

        [
            "Do you drink alcohol?",
            "Yes, at mealtimes or to relax",
            "Socially",
            "Never",
        ],

        [
            "Do you smoke?",
            "Yes",
            "Socially",
            "No",
        ],
        # up to 3
        [
            "What do you like to do in your free time?",
            "Reading",
            "Watching television",
            "Relaxing",
            "Going out",
            "Watching movies",
            "Pursuing my hobbies",
            "Gaming",
            "Surfing the internet",
            "Volunteering",
            "Hanging out with friends",
            "Spending time with my family",
            "Going to the theater, ballet or opera",
            "Listening to music",
        ],

        [
            "Where do you like to spend your free time?",
            "At my house or visiting friends",
            "Outside in nature",
            "Socialising",
        ],

        [
            "How much do you like to cook?",
            "I'm always cooking and trying new recipes",
            "I like to cook occasionally",
            "I only cook if I have to",
            "I only cook on special occasions",
            "I only eat out",
        ],
        # up to 6
        [
            "What kinds of hobbies do you have?",
            "Sports",
            "Dancing",
            "Theater",
            "Photography",
            "Film/Video",
            "Literature",
            "Art",
            "Music",
            "Cooking",
            "Cinema",
            "Architecture",
            "History",
            "Crafts",
            "Pottery",
            "Carpentry/DIY",
            "Collecting",
            "None",
        ],
        # multiple answers - no limit
        [
            "What kinds of sports or activities do you do?",
            "Tennis",
            "Table tennis",
            "Badminton",
            "Soccer",
            "Hockey",
            "Handball",
            "Volleyball",
            "Basketball",
            "Swimming",
            "Sailing",
            "Rowing",
            "Surfing",
            "Cycling",
            "Horseback riding",
            "Skiing",
            "Jogging",
            "Hiking",
            "Rock climbing",
            "Bowling",
            "Yoga/Pilates",
            "Fitness",
            "Track & field",
            "Rollerblading",
            "Golf",
            "Cricket",
            "Rugby",
            "Fishing",
            "Martial Arts",
            "Motorsports",
            "Dancing",
            "Diving",
            "Baseball",
            "Mountain Biking",
            "Kayaking",
            "Shooting",
            "Football",
            "None",
        ],

        [
            "How often do you workout/play sports?",
            "Daily",
            "A few times a week",
            "Several times a month",
            "Not very often",
        ],
        # multiple answers - no limit
        [
            "What type of music do you like to listen to?",
            "Musicals",
            "Opera",
            "Orchestral music",
            "Chamber music",
            "Folk music",
            "Easy listening",
            "Spiritual",
            "World music",
            "Jazz",
            "Rock",
            "Metal/Hard Rock",
            "Reggae",
            "Rap",
            "Dance",
            "House",
            "Blues",
            "Hip Hop",
            "Pop",
            "Alternative",
            "Country",
            "Electro",
            "Gospel",
            "Latin",
            "R&B",
            "Chillout",
            "Funk/Soul",
            "Classical music",
        ],

        [
            "Do you play an instrument?",
            "No",
            "Yes",
        ],
        # multiple answers - no limit
        [
            "What kinds of vacations do you like to take?",
            "Beach vacation",
            "Sports / Activity holiday",
            "Educational tour",
            "Meditation",
            "Cruises",
            "Resorts",
            "Staycations",
            "City trips",
            "Vacations for pure relaxation",
            "In the mountains",
            "Camping",
            "Adventure vacation",
            "Hiking",
            "Spa vacation",
            "Group travel",
        ],

        [
            "How do you plan your vacations?",
            "As little as possible, I prefer to pack and go",
            "I plan them far in advance and schedule everything",
            "I arrange the destination and dates, but I leave the rest to the moment",
        ],

        [
            "Do you enjoy taking long walks?",
            "Yes",
            "No",
        ],

        [
            "What's your approach to planning things?",
            "I'm very systematic",
            "I just let things work themselves out",
            "I have to be in the right mood to plan things",
        ],

        [
            "Do you feel more at ease at home than when you're out in a large gathering?",
            "Yes",
            "No",
        ],

        [
            "What is the ideal temperature for your house?",
            "Comfortably warm (72 degrees)",
            "A bit cooler (Maximum of 68 degrees, maybe a bit cooler)",
        ],

        [
            "Do you sleep with the window open?",
            "Always",
            "Whenever possible",
            "Never",
            "I don't mind if the window is open or closed",
        ],

        [
            "Are you a morning person or a night person?",
            "Morning person",
            "Night owl",
            "It depends on the day",
        ],
    ]

    # section 3 is a weird picture thing - I'm not replicating that

    eharmony_qa_list_4 = [
        [
            "Are you easily excited about things?",
            "Not really",
            "Yes, often",
        ],

        [
            "If you like a song, what is the usual reason?",
            "Lyrics",
            "Rhythm",
            "Melody",
        ],

        [
            "Which instrument sound do you like the most?",
            "Saxophone",
            "Violin",
            "Piano",
        ],

        [
            "Regardless of current trends, is the style and color of your clothing mostly…",
            "Restrained and muted",
            "Bold and extravagant",
        ],

        [
            "Do you normally turn on music or the television when you're home alone?",
            "Yes",
            "No",
        ],

        [
            "Does it bother you when people use their cell phone around you?",
            "Not really, I've gotten used to it",
            "It does bother me, but it's so common I just have to deal with it",
            "I can't stand it!",
            "I use the time to check my phone too",
        ],
        # limit 2
        [
            "How do you prefer to dress?",
            "Casually",
            "Sporty",
            "Practically",
            "Elegantly",
            "Fashionably",
            "Appropriate to the occasion",
            "Uniquely and unconventionally",
        ],

        [
            "Put yourself in the following situation: Imagine that you've slipped on a banana peel lying on the ground. You are not injured but people have stopped to look and someone is trying to help you out. What is your first reaction?",
            '"I can\'t believe there are people who are inconsiderate enough to drop banana skins on the pavement. Rude"',
            'I get up, pick up the banana skin and throw into a trashcan so no one else suffers like I did',
            '"Ouch! That was close!"',
            'I play it casual. I\'m embarassed and can\'t believe I\'ve drawn this much attention to myself',
            'While I\'m sitting on the ground and looking up at the people around me I say "what a disaster!" I could make a real performance of this',
            'I get up off the ground and say "It\'s no big deal" and carry on walking',
        ],

        [
            'Just imagine: You live in an apartment building. Your doorbell rings in the middle of the night. A voice you don\'t recognize on the intercom asks if your neighbor, Mr. Jones is there. What would you say?',
            '"Wrong apartment. Try again"',
            '"You\'ve woken me up in the middle of the night for that!" And hang up',
            'Nothing. I pull up my covers and go back to sleep.',
            '"No! Are you crazy? It\'s the middle of the night!"',
            '"If you\'re friends with Mr. Jones you should let him sleep"',
            'I think something might\'ve happened. I\'d try to find out what they want from him',
            '"No, this isn\'t the Jones residence, but I know the name plates are hard to read"',
        ],

        [
            "Put yourself in the following situation: Imagine a friend of yours has bought a really expensive car, one that's way more expensive than they can afford. It's also the one car you've always dreamed of having. What would you say to your friend?",

            '"You shouldn\'t live beyond your means. When will you grow up?"'

            '"What an amazing car. I\'m so jealous. I think it\'s great that you treated yourself."',
            '"It\'s so nice, I\'d be scared to park it in case it gets scratched or dented!"',
            '"You know once you\'ve driven the car off the lot, it loses half it\'s value"',
            '"It\'s so amazing! Let\'s go for a ride!"',
            '"You should let me drive it, I know how to handle a car like this"',
        ],

        [
            "Put yourself in the following situation: You and a friend are annoyed about another person's behavior. Your friend suggests you should get back at them. What would your reaction be?",
            "I'd think twice about that. What goes around comes around",
            "I don't want to get involved.",
            "It's not a big deal- we'll probably look back at what happened in a while and laugh",
            "That's a terrible idea - absolutely not!",
            "It might be kind of funny",
            "Ignore it - that person's usually not like that",
        ],

        [
            "What is your immediate reaction if a person you're very close to does something that upsets you?",
            "I let them know right away that they upset me",
            "I try to remain calm and find out what happened",
            "I think: Why does this always happen to me?",
            "I smile and pretend nothing's wrong",
        ],

        [
            "Sometimes people hurt you. How do you react?",
            "I tell myself they didn't mean it",
            "I know I'll find a way to deal with it",
            "I hold a grudge for a while",
            "I want to retailiate right away",
        ],
        [
            "If someone contradicts you when you know that you are right, how do you usually react?",
            "I get annoyed about their know-it-all attitude, but don't say anything",
            "It doesn't matter, being right isn't important to me",
            "I try to argue my point",
            "I have to find a way to convince them that I'm right",
        ],

        [
            "Put yourself in the following situation: Imagine you're at a party with your partner and you notice that they're flirting with someone else. How would you react?",
            "I try to stop it",
            "I don't say anything and keep my frustration inside",
            "I go and flirt with someone else, too",
            "No big deal, I know it doesn't mean anything",
        ],

        [
            "What do you think about climate change, conservation, renewable energy, etc?",
            "With all of our advanced technology we really should come up with something that can help",
            "We must learn how to take better care of the planet",
            "I'd prefer to ignore what's happening - it's too horrible",
        ],
    ]

    eharmony_qa_list_5 = [
        [
            "Do you like your physical appearance?",
            "Yes",
            "On the whole, yes",
            "It depends",
            "I'm sometimes unhappy about it",
        ],

        [
            "Do you believe that people are inherently good?",
            "Absolutely",
            "I want to",
            "Sometimes it's hard to believe",
            "It just depends on the situation",
        ],

        [
            "How important is sexuality to you?",
            "Very important",
            "Important",
            "Not particularly important",
            "Not important",
        ],

        [
            "What do you think about marriage as an institution?",
            "If two people really love each other, they should get married",
            "Anyone wanting to start a family should get married",
            "Marriage as an institution is completely unnecessary",
        ],

        [
            "Is it important that your belongings are always organized properly?",
            "Yes, definitely",
            "Not really",
            "The right place can mean something different for every single person",
        ],

        [
            "What do you think about going out to expensive restaurants?",
            "I highly value good cuisine, no matter the price",
            "I'd rather eat at casual places - food isn't worth that much",
            "All that's important to me is eating healthy",
        ],

        [
            "Are regular mealtimes important to you?",
            "I eat regularly and at set times",
            "No, I eat whenever I'm hungry",
        ],

        [
            "Does sex sell? What do you think of ads that use sex to promote their products?",
            "Sometimes tasteless",
            "I think it's kind of fun",
            "I'm not impressed",
        ],

        [
            "When you first start dating someone, what bothers you the most about those who are close to them?",
            "When their dad is really overbearing",
            "When their mom is overprotective of them",
            "If their old friends have too much influence over their behavior",
            "If they are frequently in a bad mood",
            "My partner's friends that are weird/unstable",
        ],
        # up to 2 answers
        [
            "What values are the most important to you?",
            "True friendship",
            "Love",
            "Peace and happiness",
            "A successful career",
            "Respect from everyone I know",
            "Stable social setting",
            "Personal development and growth",
            "A comfortable home with the person I love",
        ],

        [
            "What mantra do you live your life by?",
            "Work hard. Play hard",
            "Love your neighbour as you love yourself",
            "Live and let live",
        ],
        # up to 2 answers
        [
            "What do you want more than anything right now?",
            "To be successful at work",
            "To meet nice, interesting people",
            "To make new friends",
            "To find the love of my life",
            "To find someone I can spend the rest of my life with",
            "To make a brand new start",
            "To build a safe and secure relationship slowly and steadily",

        ],
    ]

# mc_qa_list is used to answer mc questions for fake profiles
    mc_qa_list = add_all_mc_qa(
        *our_qa_list, *eharmony_qa_list_1, *eharmony_qa_list_2, *eharmony_qa_list_4, *eharmony_qa_list_5)


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
            user_matches_from_db = Match.query.join(
                Match.users).filter(User.id == id1).all()
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
                        msg = Message(message=message,
                                      from_id=from_id, match_id=match_id)
                        db.session.add(msg)
                        break

    make_fake_messages(num_fake_messages, fake_user_list, fake_match_history)


####################################################
# SEED PHOTO TABLE
####################################################

    for i in range(num_fake_users):
        db.session.add(Photo(photo_url='https://while-single-bucket.s3-us-west-2.amazonaws.com/rita-wilson-photo-u24.jpeg',
                             user_id=randrange(1, num_fake_users)))
        db.session.add(Photo(photo_url='https://while-single-bucket.s3-us-west-2.amazonaws.com/ThuOct291654392020.png',
                             user_id=randrange(1, num_fake_users)))
        db.session.add(Photo(photo_url='https://while-single-bucket.s3-us-west-2.amazonaws.com/ThuOct291519152020.png',
                             user_id=randrange(1, num_fake_users)))
        db.session.add(Photo(photo_url='https://while-single-bucket.s3-us-west-2.amazonaws.com/ThuOct291710322020.png',
                             user_id=randrange(1, num_fake_users)))
        db.session.add(Photo(photo_url='https://while-single-two.s3-us-west-2.amazonaws.com/SunNov11437042020.png',
                             user_id=randrange(1, num_fake_users)))
        db.session.add(Photo(photo_url='https://while-single-two.s3-us-west-2.amazonaws.com/SunNov11446152020.png',
                             user_id=randrange(1, num_fake_users)))
        db.session.add(Photo(photo_url='https://while-single-two.s3-us-west-2.amazonaws.com/SunNov11448092020.png',
                             user_id=randrange(1, num_fake_users)))
        db.session.add(Photo(photo_url='https://while-single-two.s3-us-west-2.amazonaws.com/SunNov11450292020.png',
                             user_id=randrange(1, num_fake_users)))
        db.session.add(Photo(photo_url='https://while-single-two.s3-us-west-2.amazonaws.com/SunNov11453242020.png',
                             user_id=randrange(1, num_fake_users)))
        db.session.add(Photo(photo_url='https://while-single-two.s3-us-west-2.amazonaws.com/SunNov11507092020.png',
                             user_id=randrange(1, num_fake_users)))


####################################################
# COMMIT DB CHANGES
####################################################
    db.session.commit()
