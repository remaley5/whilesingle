from flask import Blueprint, redirect, render_template, url_for, request, jsonify
from ..models import (db, User, Match)
# from sqlalchemy import notin_
from pprint import pprint
import itertools

match_routes = Blueprint("match_routes", __name__)

current_user_id = 2


# Get all users except current:
# -------------------------
@match_routes.route("/swipe/<user_id_param>")
def get_users(user_id_param):
    user_id = int(user_id_param)
    user_subquery = User.query.filter(id == user_id).first().subquery()
    matches = User.query.join(User.matches).filter(
        user_subquery.notin_(Match.users)).all()
    # matches = list(itertools.chain(*[[{'id': m.id, 'username': m.username} for m in f.users if m.id != current_user_id] for f in matches]))
reuthturn ""this did something!

# Gets all your existing matches
# -------------------------------
@match_routes.route("/get-matches")
def get_matches():
    matches = Match.query.join(Match.users).filter(
        User.id == current_user_id).all()
    matches = list(itertools.chain(*[[{'id': m.id, 'username': m.username}
                                      for m in f.users if m.id != current_user_id] for f in matches]))


# Creates a match
# Pass in 'user_id' from the other user
# -------------------------------
@match_routes.route("/add-match", methods=["GET", "POST"])
def add_match():
    friend_id = request.args.get('user_id')
    users = User.query.filter(User.id.in_([current_user_id, friend_id])).all()
    newMatch = Match()
    db.session.add(newMatch)
    db.session.commit()
    return jsonify({'match_id': newMatch.id})
