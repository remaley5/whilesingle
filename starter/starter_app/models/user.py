from . import db
from . import utcnow
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password_digest = db.Column(db.String(255), nullable=False)
    mc_responses = db.relationship('MC_Response', backref='users')

    fr_responses = db.relationship('FR_Response', backref='users')

    matches = db.relationship(
        "Match", secondary="match_users", back_populates="users")

    photos = db.relationship("Photo", backref="users")
    location = db.Column(db.String(60))

    preferences = db.relationship(
        'Preference', secondary='user_preferences', back_populates='users')

    gender_id = db.Column(db.Integer, db.ForeignKey(
        "genders.id"))

    genders = db.relationship('Gender', back_populates='users')

    pronoun_id = db.Column(db.Integer, db.ForeignKey(
        "pronouns.id"))

    pronouns = db.relationship('Pronoun', back_populates='users')

    bio = db.Column(db.Text)

    # rejects = db.relationship('Reject', foreign_keys=[id], back_populates='users')

    def to_dict(self):
        preferences = [[pref.id, pref.preference] for pref in self.preferences]
        # rejects = [reject.reject_id for reject in self.rejects]
        gender = [self.genders.id, self.genders.gender] if self.genders else ''
        pronouns = [self.pronouns.id, self.pronouns.pronoun] if self.pronouns else ''

        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            'location': self.location,
            'preferences': preferences,
            'bio': self.bio,
            'gender': gender,
            'pronouns': pronouns,
            # 'rejects': rejects
        }

    @property
    def password(self):
        raise AttributeError('Password not readable.')

    @password.setter
    def password(self, password):
        self.password_digest = generate_password_hash(password)

    @classmethod
    def authenticate(cls, email, password):
        user = cls.query.filter(User.email == email).scalar()
        if user is None:
            return False, user
        return check_password_hash(user.password_digest, password), user


class MatchRequest(db.Model):
    __tablename__ = 'match_requests'

    id = db.Column(db.Integer, primary_key=True)
    to_id = db.Column(db.Integer, db.ForeignKey(
        "users.id"), nullable=True)
    from_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column('created_at', db.DateTime, default=utcnow())

    to_user = db.relationship('User', foreign_keys=[to_id])
    from_user = db.relationship('User', foreign_keys=[from_id])

class Photo(db.Model):
    __tablename__ = 'photos'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        "users.id"), nullable=False)
    photo_url = db.Column(db.String, nullable=False, unique=True)
    created_at = db.Column('created_at', db.DateTime, default=utcnow())

    user = db.relationship("User")

    def to_dict(self):
        return {
        'photo_url': self.photo_url,
        'user_id': self.user_id,
        'created_at': self.created_at }



class Gender(db.Model):
    __tablename__ = 'genders'

    id = db.Column(db.Integer, primary_key=True)
    gender = db.Column(db.String(40))
    users = db.relationship(
        'User', back_populates='genders')


class Pronoun(db.Model):
    __tablename__ = 'pronouns'

    id = db.Column(db.Integer, primary_key=True)
    pronoun = db.Column(db.String(40))
    users = db.relationship(
        'User', back_populates='pronouns')

class Preference(db.Model):
    __tablename__ = 'preferences'

    id = db.Column(db.Integer, primary_key=True)
    preference = db.Column(db.String(40))
    users = db.relationship(
        'User', secondary='user_preferences', back_populates='preferences')


user_preferences = db.Table(
    'user_preferences',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(
        'users.id'), primary_key=True),
    db.Column('preference_id', db.Integer, db.ForeignKey(
        'preferences.id'), primary_key=True)
)


class Reject(db.Model):
    __tablename__ = 'rejects'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    reject_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # user = db.relationship('User', foreign_keys=[user_id])
    # reject = db.relationship('User', foreign_keys=[reject_id])

    rejected_people = db.relationship(
        'User', foreign_keys=[reject_id], backref='rejects')
    user = db.relationship('User', foreign_keys=[user_id])
