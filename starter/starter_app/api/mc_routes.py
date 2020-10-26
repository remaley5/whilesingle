from flask import Blueprint
from starter_app.models import MC_Question, MC_Answer_Option, MC_Response


mc_routes = Blueprint('mc', __name__)


@mc_routes.route('/')
def index():
    response = MC_Question.query.all()
    return {'mc_questions': [question.to_dict() for question in response]}
