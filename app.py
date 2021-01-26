from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from flask_login import (
    LoginManager,
    UserMixin,
    current_user,
    login_required,
    login_user,
    logout_user,
)
from flask_wtf.csrf import CSRFProtect, generate_csrf
import json

from model.event import Event
from model.user import User
from model.company import Company

app = Flask(__name__)

app.config.update(
    DEBUG=True,
    SECRET_KEY="secret_sauce",
    SESSION_COOKIE_HTTPONLY=True,
    REMEMBER_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE="Lax",
)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.session_protection = "strong"

csrf = CSRFProtect(app)
cors = CORS(
    app,
    resources={r"*": {"origins": "http://localhost:3000"}},
    expose_headers=["Content-Type", "X-CSRFToken"],
    supports_credentials=True,
)

@login_manager.user_loader
def load_user(user_id):
    return User.find(user_id)

@app.route("/api/")
def home():
    return "Hello there, world!"

@app.route("/api/getcsrf", methods=["GET"])
def get_csrf():
    token = generate_csrf()
    response = jsonify({"detail": "CSRF cookie set"})
    response.headers.set("X-CSRFToken", token)
    return response


@app.route("/api/login", methods=["POST"])
def login():
    content = request.get_json(force=True)
    print(content)

    user_model = User.find_for_login(content.get('username'), content.get('password'))
    login_user(user_model)

    return jsonify({"login": True})


@app.route("/api/data", methods=["GET"])
@login_required
def user_data():
    modal_id = current_user.id
    user = User.find(modal_id)
    print(user.to_dict())
    return user.to_dict()


@app.route("/api/user-role", methods=["GET"])
@login_required
def user_role():
    modal_id = current_user.id
    user_role = User.find(modal_id).role
    print(user_role)
    return jsonify({"role": user_role})


@app.route("/api/getsession", methods=["GET"])
def check_session():
    print("get_session")
    if current_user.is_authenticated:
        return jsonify({"login": True})

    return jsonify({"login": False})


@app.route("/api/logout")
@login_required
def logout():
    print("I work indeed")
    logout_user()
    return jsonify({"logout": True})

@app.route("/api/events", methods=['GET'])
def events_list():
    all_events = []
    for event in Event.all():
        all_events.append(event)
    return jsonify(all_events)

@app.route("/api/list-users", methods=['GET'])
def list_users():
    event_id = request.args.get('event_id')

    result = User.get_participants_names_sp(event_id)

    print(result)

    return jsonify(result)

@app.route("/api/register", methods=['GET', 'POST', 'PATCH'])
def register():
    content = request.get_json(force=True)
    
    print(content)

    if content.get('role') == "visitor":
        User.registerVisitor(content.get('username'), content.get('password'), content.get('role'))
    elif content.get('role') == "participant":
        User.registerParticipant(content.get('username'), content.get('password'), content.get('role'), content.get('event'))
        Event.add_participant(content.get('event'))

    return jsonify({"register": True})

@app.route("/api/create-event", methods=['GET', 'POST'])
def create_event():
    content = request.get_json(force=True)
    print(content)

    Event.create(content.get('name'))

    return jsonify({"create": True})

@app.route("/api/create-company", methods=['POST'])
def create_company():
    content = request.get_json(force=True)

    Company.register(content.get('name'), content.get('event_id'))

    return jsonify({"register": True})

if __name__ == "__main__":
    app.run()