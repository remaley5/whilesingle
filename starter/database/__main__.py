from . import app, db
from .pronoun import seed_pronouns
from .gender import seed_genders
from .preference import seed_preferences
from .base_user import seed_base_users
from .random_user import seed_random_users
from .match_and_match_request import seed_match_and_match_requests
from .mc_question import seed_mc_questions
from .mc_response import seed_mc_responses
from .fr_question import seed_fr_questions
from .fr_response import seed_fr_responses
from .reject import seed_rejects
from .message import seed_messages
from .photo import seed_photos
from dotenv import load_dotenv
load_dotenv()

# num_fake_users must be at least 4
num_fake_users = 10

# num_fake_messages is the AVERAGE number of messages sent
num_fake_messages = 10

with app.app_context():
    db.drop_all()
    db.create_all()
    # arrays returned from seed functions (e.g. preferences, genders, and pronouns, etc.) used in other seed functions (e.g. seed_random_users, seed_mc_responses, etc.)
    preferences = seed_preferences()
    genders = seed_genders()
    pronouns = seed_pronouns()
    base_users = seed_base_users(preferences, genders, pronouns)
    seed_rejects()
    random_users = seed_random_users(
        preferences, genders, pronouns, num_fake_users)
    random_confirmed_match_requests = seed_match_and_match_requests(
        base_users, random_users)
    mc_qa_list = seed_mc_questions()
    seed_mc_responses(random_users, mc_qa_list)
    fr_q_list = seed_fr_questions()
    seed_fr_responses(random_users, fr_q_list)
    seed_messages(random_users, num_fake_messages,
                  random_confirmed_match_requests)
    seed_photos(len(random_users))
