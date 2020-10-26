from flask import Blueprint
from starter_app.models import User, FR_Question, FR_Response


fr_routes = Blueprint('fr', __name__)


@fr_routes.route('/')
def index():
    response = FR_Question.query.all()
    return {'fr_questions': [question.to_dict() for question in response]}
