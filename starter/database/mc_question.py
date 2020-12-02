from . import db, MC_Question, MC_Answer_Option


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


def seed_mc_questions():
    mc_qa_list = add_all_mc_qa(
        *our_qa_list, *eharmony_qa_list_1, *eharmony_qa_list_2, *eharmony_qa_list_4, *eharmony_qa_list_5)
    db.session.commit()
    return mc_qa_list
