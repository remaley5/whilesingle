from flask import Blueprint, jsonify
from starter_app.models import User
from flask_login import current_user, login_required

user_routes = Blueprint('users', __name__)

# user_id = 2


@user_routes.route('/')
@login_required
def index():
    response = User.query.all()
    return {"users": [user.to_dict() for user in response]}


# Get all users except current:
# -------------------------
# @user_routes.route("/swipe")
# def get_users():
#     newFriends = User.query.order_by(User.id)
#     user_list = [{'id': f.id, 'username': f.username} for f in newFriends if f.id != user_id]
#     return jsonify(user_list)

# @user_routes.route('/<int:id>', methods=['GET', 'POST'])
# def user_detail(id):
#   return {}
