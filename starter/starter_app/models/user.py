# from flask_sqlalchemy import SQLAlchemy

# db = SQLAlchemy()
from . import db


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)

    mc_responses = db.relationship('MC_Response', backref='users')

    fr_responses = db.relationship('FR_Response', backref='users')

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
        }
