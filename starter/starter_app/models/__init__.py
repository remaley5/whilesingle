from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


from .user import User

from .mult_choice import MC_Response, MC_Question, MC_Answer_Option
