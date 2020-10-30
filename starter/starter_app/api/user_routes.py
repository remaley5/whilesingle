from flask import Blueprint, jsonify, request
from starter_app.models import User, Photo, db, Preference, Gender, Pronoun
from flask_login import current_user, login_required, login_user

user_routes = Blueprint('users', __name__)

# user_id = 2


@user_routes.route('/')
@login_required
def index():
    response = User.query.all()
    return {"users": [user.to_dict() for user in response]}


@user_routes.route('/', methods=["POST"])
def createUser():
    email, password, firstName, lastName = request.json.values()
    user = User(email=email, password=password,
                first_name=firstName, last_name=lastName)
    db.session.add(user)
    db.session.commit()
    login_user(user)
    return {"current_user_id": current_user.id}

@user_routes.route('/<int:id>', methods=["POST"])
def updateUser(id):
    user = User.query.get(id)
    if request.json['bio'] and request.json['bio'] != '':
        user.bio = request.json['bio']
    db.session.add(user)
    db.session.commit()
    return 'ok'


@user_routes.route('/<int:id>')
def getUser(id):
    user = User.query.filter(User.id == id).one_or_none()
    data = []
    if user:
        data = user.to_dict()
    return {'user': data}


@user_routes.route('/photos/<int:user_id_param>')
def getPhotos(user_id_param):
    photos = Photo.query.filter(Photo.user_id == user_id_param)
    photoList = [photo.to_dict() for photo in photos]
    print('-------------------', photoList)
    return jsonify({'photos': photoList})

# pronouns genders preferences

@user_routes.route('/info_options')
def getUserInfoOptions():
    pronouns = Pronoun.query.all()
    pronounList = [pronoun.pronoun for pronoun in pronouns]
    genders = Gender.query.all()
    genderList = [gender.gender for gender in genders]
    preferences = Preference.query.all()
    preferenceList = [preference.preference for preference in preferences]
    return {'pronouns': pronounList,
            'genders': genderList,
            'preferences': preferenceList}
