from starter_app import (app, db, User, MC_Response,
                         MC_Question, MC_Answer_Option, FR_Response,
                         FR_Question, Match, Message, MatchRequest,
                         Preference, Gender, Pronoun, Photo, Reject)
from faker import Faker
from .bio import bio_list
# this has to happen BEFORE the import of seed function files
fake = Faker()
# use this so same fake data generated each time
Faker.seed(420)
