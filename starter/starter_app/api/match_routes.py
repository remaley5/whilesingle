from flask import Blueprint, redirect, render_template, url_for, request, jsonify
from ..models import (db, User, Match, MatchRequest)
from pprint import pprint
from flask_login import login_required
import itertools


match_routes = Blueprint("match_routes", __name__)

def query_matches(user_id):
    id = int(user_id)
    return Match.query.join(Match.users).filter(User.id == id).all()

# Get all users except matches and current:
# -------------------------
@match_routes.route("/swipe/<user_id_param>")
@login_required
def get_users(user_id_param):
    matches = query_matches(user_id_param)
    user_id = int(user_id_param)
    matched_id = list(itertools.chain(*[[m.id for m in f.users if m.id != user_id] for f in matches]))
    users = User.query.filter(User.id.notin_(matched_id))
    users = [{"user_id": m.id, "first_name": m.first_name, "last_name": m.last_name} for m in users if m.id != user_id]
    return jsonify(users)

# Get all your existing matches:
# -------------------------------
@match_routes.route("/get-matches/<user_id_params>")
@login_required
def get_matches(user_id_params):
    user_id = int(user_id_params)
    matches = query_matches(user_id)
    matches = list(itertools.chain(*[[{"match_id":f.id, "user_id": m.id, "first_name": m.first_name, "last_name": m.last_name} for m in f.users if m.id != user_id] for f in matches]))
    return jsonify(matches)

# Creates a match
# Pass in "user_id" for the other user
# -------------------------------
@match_routes.route("/add-match/<user_id_params>", methods=["GET", "POST"])
@login_required
def add_match(user_id_params):
    friend_id = request.get_json().get('user_id', '')
    user_id = int(user_id_params)
    if(MatchRequest.query.filter(MatchRequest.to_id == user_id).filter(MatchRequest.from_id == friend_id).delete()):
        db.session.commit()
        users = User.query.filter(User.id.in_([user_id, friend_id])).all()
        newMatch = Match()
        newMatch.users.extend(users)
        db.session.add(newMatch)
        db.session.commit()
        # return jsonify({"match_id": newMatch.id, "friend_id": friend_id, "user_id": user_id})
        return "You matched!"
    else:
        newRequest = MatchRequest(to_id=friend_id, from_id=user_id)
        db.session.add(newRequest)
        db.session.commit()
        return "Sent request!"
