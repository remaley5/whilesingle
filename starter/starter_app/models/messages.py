from . import db
# for getting timestamp
from sqlalchemy.sql import func
from . import utcnow

match_users = db.Table(
    "match_users",
    db.Model.metadata,
    db.Column("match_id", db.Integer, db.ForeignKey(
        "matches.id"), primary_key=True),
    db.Column("user_id", db.Integer, db.ForeignKey(
        "users.id"), primary_key=True)
)


class Message(db.Model):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(2000), nullable=False)
    from_id = db.Column(db.Integer)
    match_id = db.Column(db.Integer, db.ForeignKey(
        "matches.id"), nullable=True)
    created_at = db.Column('created_at', db.DateTime, default=utcnow())

    match = db.relationship("Match")

    def __repr__(self):
        return f'- Message: {self.id}, To: {self.to_id}, From: {self.from_id}'


class Match(db.Model):
    __tablename__ = 'matches'

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column('created_at', db.DateTime, default=utcnow())

    users = db.relationship(
        "User", secondary="match_users", back_populates="matches")

    def __repr__(self):
        return f'- Match: {self.id} -'
