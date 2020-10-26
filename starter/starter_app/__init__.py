import os
from flask import Flask, render_template, request, session
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_migrate import Migrate


from starter_app.models import db

from starter_app.api import user_routes, fr_routes, mc_routes, message_routes

from starter_app.config import Config

app = Flask(__name__)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(fr_routes, url_prefix='/api/fr')
app.register_blueprint(mc_routes, url_prefix='/api/mc')
app.register_blueprint(message_routes, url_prefix='/api/messages')

db.init_app(app)

# included so alembic migrations folder within models folder
MIGRATION_DIR = os.path.join('starter_app', 'models', 'migrations')
Migrate(app, db, directory=MIGRATION_DIR)

## Application Security
CORS(app)
@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') else False,
        samesite='Strict' if os.environ.get('FLASK_ENV') else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
