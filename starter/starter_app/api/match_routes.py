from flask import Blueprint, redirect, render_template, url_for, request, jsonify
from ..models import (db, User, Match)
# from sqlalchemy import and_
from pprint import pprint
import itertools

match_routes = Blueprint("match_routes", __name__)

current_user_id = 2


# Get all users except current:
# -------------------------
# @user_routes.route("/swipe")
# def get_users():
#     newFriends = User.query.order_by(User.id)
#     user_list = [{'id': f.id, 'username': f.username} for f in newFriends if f.id != user_id]
#     return jsonify(user_list)


# Gets all your existing matches
# -------------------------------
@match_routes.route("/get-matches")
def get_matches():
    matches = Match.query.join(Match.users).filter(User.id == current_user_id).all()
    matches = list(itertools.chain(*[[{'id': m.id, 'username': m.username} for m in f.users if m.id != current_user_id] for f in matches]))
    return jsonify(matches)


# Creates a match
# Pass in 'user_id' from the other user
# -------------------------------
@match_routes.route("/add-match", methods=["GET", "POST"])
def add_match():
    friend_id = request.args.get('user_id')
    users = User.query.filter(User.id.in_([current_user_id, friend_id])).all()
    newMatch = Match()
    newMatch.users.extend(users)
    db.session.add(newMatch)
    db.session.commit()
    return jsonify({'match_id': newMatch.id})
