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

    def to_dict(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email
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
    from_id = db.Column(db.Integer)
    created_at = db.Column('created_at', db.DateTime, default=utcnow())

    user = db.relationship("User")

class Photo(db.Model):
    __tablename__ = 'photos'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
    "users.id"), nullable=False)
    photo_url = db.Column(db.String, nullable=False, unique=True)
    created_at = db.Column('created_at', db.DateTime, default=utcnow())

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "photo_url": self.photo_url,
            "created_at": self.created_at
        }
