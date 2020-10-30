from flask import Blueprint, redirect, render_template, url_for, request, jsonify
from ..models import (db, User, Match, MatchRequest, Photo, Reject)
from pprint import pprint
from flask_login import login_required
import itertools
from sqlalchemy.orm import joinedload

match_routes = Blueprint("match_routes", __name__)

def query_matches(user_id):
    id = int(user_id)
    return Match.query.join(Match.users).filter(User.id == id).all()

# Get all users except matches and current:
# -------------------------
@match_routes.route("/swipe/<user_id_param>")
@login_required
def get_users(user_id_param):
    rejects = [id for id, in Reject.query.filter(Reject.user_id == user_id_param).with_entities(Reject.reject_id)]

    right_swipes = [id for id, in MatchRequest.query.filter(MatchRequest.from_id == user_id_param).with_entities(MatchRequest.to_id)]

    print(rejects, '=================================')
    matches = query_matches(user_id_param)
    user_id = int(user_id_param)
    matched_id = list(itertools.chain(*[[m.id for m in f.users if m.id != user_id] for f in matches]))
    matched_id.append(user_id)
    matched_id += rejects
    matched_id += right_swipes
    users = User.query.options(joinedload("photos")).filter(User.id.notin_(matched_id)).limit(10)
    data = [{'user':{**user.to_dict(), 'photos':[photo.to_dict() for photo in user.photos]}} for user in users]
    return jsonify(data)

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


@match_routes.route("/reject/<user_id_params>", methods=['POST'])
@login_required
def reject_user(user_id_params):
    user_id = int(user_id_params)
    reject_id = int(request.json['user_id'])
    reject = Reject(user_id=user_id, reject_id=reject_id)
    db.session.add(reject)
    db.session.commit()
    print('===========================================================================================', user_id, reject_id, '===========================================================================================')
    return 'ok'