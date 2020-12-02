from . import db, MatchRequest, Match
from random import randrange

def seed_match_and_match_requests(base_users, fake_user_list):
    ivan_and_javier = Match(users=[base_users[0], base_users[1]], status=True)
    dean_to_javier = MatchRequest(from_id=3, to_id=2)
    angela_to_javier = MatchRequest(from_id=4, to_id=2)

    db.session.add(ivan_and_javier)
    db.session.add(dean_to_javier)
    db.session.add(angela_to_javier)

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
    # we copy match_history after running function with Match - fake_match_history contains ONLY confirmed matches
    fake_match_history = {**make_fake_match_and_match_req(
        match_history, 0.5, Match)}
    # this dict contains both confirmed matches AND match requests - we don't care about match requests
    # power of 0.2 used so there are less match requests than matches
    fake_match_and_match_request_history = make_fake_match_and_match_req(match_history, 0.2, MatchRequest)
    db.session.commit()
    return fake_match_history
