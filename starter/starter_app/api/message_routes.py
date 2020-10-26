from flask import Blueprint, redirect, render_template, url_for, request, jsonify
# from ..forms import UserForm, AddFriendForm, MessageForm
from ..models import (db, User, Match, Message)
from sqlalchemy import and_
from pprint import pprint
import itertools

message_routes = Blueprint("message_routes", __name__, url_prefix="")

current_user_id = 2


# Gets all messages between current user and selected match/user:
# Pass in the correlating 'match_id' for that match/user
# -------------------------------
@message_routes.route("/get-messages")
def get_messages():
    match_id = request.args.get('match_id')
    messages = Message.query.filter(match_id == match_id)
    messages = [{'message': m.message, 'message_id': m.id, 'from_id': m.from_id, 'to_id': m.to_id} for m in messages]
    if (messages):
        return jsonify(messages)
    return 'no messages'


# Sends a new message
# Pass in the new 'message' and correlating 'match_id' for that match/user
# -------------------------------
@message_routes.route("/sendmessage", methods=["GET", "POST"])
def send_message():
    message = request.args.get('message')
    match_id = request.args.get('match_id')
    message = Message(message=message, from_id=current_user_id, match_id=match_id)
    db.session.add(message)
    db.session.commit()
    return jsonify(message)
