from . import db, Message, Match, User, fake
from random import randrange


def seed_messages(users, avg_num_messages, match_history):
    msg1 = Message(message='hello Ian it is your friend, Javier.',
                   from_id=2, match_id=1)
    msg2 = Message(message='Hey, Javier! Nice to meet you!',
                   from_id=1, match_id=1)
    db.session.add(msg1)
    db.session.add(msg2)

    # send messages for each fake user
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

    db.session.commit()
