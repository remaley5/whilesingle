from flask import Blueprint, jsonify, request
from starter_app.models import User, Photo, db, Preference, Gender, Pronoun
from flask_login import current_user, login_required, login_user
from sqlalchemy.orm import joinedload

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
    print(user.preferences)
    data = request.json
    # there's gotta be a better way... but this works
    try:
        user.gender_id = int(data['gender'])
    except KeyError:
        pass
    try:
        user.pronoun_id = int(data['pronouns'])
    except KeyError:
        pass
    try:
        preferences = data['preferences']
        if len(preferences) > 0:
            prefList = Preference.query.filter(Preference.id.in_(preferences)).all()
            print(prefList)
            user.preferences = prefList
    except KeyError:
        pass
    try:
        orientation = data['orientation']
        if orientation != []:
            user.orientation = orientation
    except KeyError:
        pass
    try:
        bio = data['bio']
        if bio != '':
            user.bio = bio
    except KeyError:
        pass
    try:
        birthday = data['birthday']
        if birthday != {}:
            user.birthday_month = birthday['month']
            user.birthday_year = birthday['year']
            user.birthday_day = birthday['day']
    except KeyError:
        pass
    try:
        location = data['location']
        if location != '':
            user.location = location
    except KeyError:
        pass

    db.session.add(user)
    db.session.commit()
    return 'ok'


@user_routes.route('/<int:id>')
def getUser(id):
    user = User.query.options(joinedload("photos")).filter(User.id == id).one_or_none()
    data = []
    print(user.photos, '============================')
    if user:
        data = user.to_dict()
        data['photos'] = [photo.to_dict() for photo in user.photos]
    return {'user': data}

    # users = User.query.options(joinedload("photos")).filter(User.id.notin_(matched_id)).limit(10)
    # data = [{'user':{**user.to_dict(), 'photos':[photo.to_dict() for photo in user.photos]}} for user in users]


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
    pronounList = [[pronoun.id, pronoun.pronoun] for pronoun in pronouns]
    genders = Gender.query.all()
    genderList = [[gender.id, gender.gender] for gender in genders]
    preferences = Preference.query.all()
    preferenceList = [[preference.id, preference.preference] for preference in preferences]
    return {'pronouns': pronounList,
            'genders': genderList,
            'preferences': preferenceList}
