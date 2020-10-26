from flask import Blueprint, redirect, render_template, url_for, request, jsonify
# from ..forms import UserForm, AddFriendForm, MessageForm
from ..models import (db, User, Match, Message)
from sqlalchemy import and_
from pprint import pprint
import itertools

message_routes = Blueprint("messages_routes", __name__, url_prefix="")

userId = 2

@message_routes.route("/matches")
def get_matches():
    if request.method == 'POST':
        newFriends = User.query.order_by(User.id)
        friend_list = [(f.id, f"User {f.first_name}") for f in newFriends]
        data = {'friends_list': friend_list}
        return jsonify(data)
    return jsonify('bad request')


@message_routes.route("/matches", methods=["GET", "POST"])
def add_match():
    friend_id = request.args.get('user_id')
    users = User.query.filter(User.id.in_([userId, friend_id])).all()
    newMatch = Match()
    newMatch.users.extend(users)
    db.session.add(newMatch)
    db.session.commit()
    return jsonify(newMatch)


@message_routes.route("/messages")
def get_messages():
    matches = Match.query.join(Match.users).filter(User.id == userId).join(Match.users).all()
    matches = list(itertools.chain(*[[(m.id, m.first_name) for m in f.users if m.id != userId] for f in matches]))
    return jsonify(matches)


@message_routes.route("/sendmessage", methods=["GET", "POST"])
def send_message():
    message = request.args.get('message')
    friend_id = request.args.get('friend_id')
    match_id = request.args.get('match_id')
    message = Message(message=message, from_id=userId, to_id=friend_id, match_id=match_id)
    db.session.add(message)
    db.session.commit()
    return jsonify(message)
