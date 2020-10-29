import os
from flask import Flask, render_template, request, session, jsonify
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_migrate import Migrate
from flask_login import (
    LoginManager,
    current_user,
    login_user,
    logout_user,
    login_required
)

from starter_app.models import (
    db,
    User,
    MC_Response,
    MC_Question,
    MC_Answer_Option,
    Message
)

from starter_app.api import user_routes, fr_routes, mc_routes, message_routes, match_routes, upload_routes

from starter_app.config import Config

from flask_socketio import SocketIO, send


app = Flask(__name__)
socketio = SocketIO(app)
socketio.run(app)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(fr_routes, url_prefix='/api/questions/fr')
app.register_blueprint(mc_routes, url_prefix='/api/questions/mc')
app.register_blueprint(message_routes, url_prefix='/api/messages')
app.register_blueprint(match_routes, url_prefix='/api/matches')
app.register_blueprint(upload_routes, url_prefix='/api/uploads')

db.init_app(app)
login_manager = LoginManager(app)

# included so alembic migrations folder within models folder
MIGRATION_DIR = os.path.join('starter_app', 'models', 'migrations')
Migrate(app, db, directory=MIGRATION_DIR)

# Application Security
# CORS(app)
CSRFProtect(app)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')


@app.route('/api/csrf/restore')
def restore_csrf():
    id = current_user.id if current_user.is_authenticated else None
    return {'csrf_token': generate_csrf(), "current_user_id": id}


@app.route('/login', methods=['GET', 'POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email or not password:
        return {"errors": ["Missing required parameters"]}, 400

    authenticated, user = User.authenticate(email, password)
    # print(authenticated)
    # print(user)
    if authenticated:
        login_user(user)
        return {"current_user_id": current_user.id}

    return {"errors": ["Invalid email or password"]}, 401


@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return {"msg": "You have been logged out"}, 200




@app.route("/api/messages/get-messages/<match_id_params>")
@login_required
def get_messages(match_id_params):
    match_id = int(match_id_params)
    messages = Message.query.filter(match_id == match_id)
    messages = [{'message': m.message, 'message_id': m.id, 'from_id': m.from_id} for m in messages]
    if (messages):
        return jsonify(messages)
    return 'no messages'

@socketio.on('FromClient')
def handle_message(data):
    print(data, '============================================================')
    socketio.emit(f"FromAPI/{data['match_id']}", data)

    message = Message(message=data['message'], from_id=data['from_id'], match_id=data['match_id'])

    db.session.add(message)
    db.session.commit()
