from flask import Blueprint, redirect, render_template, url_for, request, jsonify
# from ..forms import UserForm, AddFriendForm, MessageForm
from ..models import (db, User, Match, Message)
from sqlalchemy import and_
from pprint import pprint
from flask_login import login_required
import itertools


message_routes = Blueprint("message_routes", __name__, url_prefix="")

# Gets all messages between current user and selected match/user:
# Pass in the correlating 'match_id' for that match/user
# -------------------------------
@message_routes.route("/get-messages/<match_id_params>")
@login_required
def get_messages(match_id_params):
    match_id = int(match_id_params)
    messages = Message.query.filter(match_id == match_id)
    messages = [{'message': m.message, 'message_id': m.id, 'from_id': m.from_id} for m in messages]
    if (messages):
        return jsonify(messages)
    return 'no messages'

# Sends a new message
# Pass in the new 'message', correlating 'match_id' and current 'user_id' (sender)
# -------------------------------
@message_routes.route("/send-message", methods=["GET", "POST"])
@login_required
def send_message():
    user_id = request.get_json().get('user_id', '')
    message = request.get_json().get('message', '')
    match_id = request.get_json().get('match_id', '')
    message = Message(message=message, from_id=user_id, match_id=match_id)
    db.session.add(message)
    db.session.commit()
    return "message sent"
