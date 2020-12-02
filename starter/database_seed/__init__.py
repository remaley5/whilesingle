from starter_app.models import User, MC_Response, MC_Question, MC_Answer_Option, FR_Response, FR_Question, Match, Message, MatchRequest, Preference, Gender, Pronoun, Photo, Reject
from starter_app import app, db
from faker import Faker
from random import randrange
from dotenv import load_dotenv

from .pronoun import seed_pronouns
from .gender import seed_genders
from .preference import seed_preferences
