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
from model.message import Message

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

# User.registerAdmin("Admin", "admin")

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

@app.route("/api/list-active-events", methods=['GET'])
def events_list():
    active_events = Event.get_all_active()
    return jsonify(active_events)

@app.route("/api/list-all-events", methods=['GET'])
def events_archive():
    events = Event.all()
    return jsonify(events)

@app.route("/api/list-users", methods=['GET'])
def list_users():
    event_id = request.args.get('event_id')

    result = User.get_participants_sp(event_id)

    print(result)

    return jsonify(result)

@app.route("/api/list-companies", methods=['GET'])
def list_companies():
    event_id = request.args.get('event_id')
    print(event_id)

    Event.add_visitor(event_id)

    result = Company.get_companies_sp(event_id)
    print(result)

    return jsonify(result)

@app.route("/api/get-company", methods=['GET'])
def get_company():
    user_id = request.args.get('user_id')
    print(user_id)

    company_id = User.find_company_id(user_id)
    company = Company.get_company(company_id)
    print(company.to_dict())
    return company.to_dict()

@app.route("/api/load-messages", methods=['GET'])
def load_messages():
    company_id = request.args.get('company_id')
    print(company_id)

    company_chat = Message.load_messages_for(company_id)
    print(company_chat)

    return jsonify(company_chat)

@app.route("/api/register", methods=['GET', 'POST', 'PATCH'])
def register():
    content = request.get_json(force=True)
    
    print(content)

    User.registerVisitor(content.get('username'), content.get('password'))

    return jsonify({"register": True})

@app.route("/api/register-participant", methods=['GET', 'POST'])
def register_participant():
    content = request.get_json(force=True)
    print(content)

    comp_id = Company.find_id(content.get('company_name'), content.get('company_password'), content.get('event'))
    User.registerParticipant(content.get('username'), content.get('password'), content.get('event'), comp_id)
    Event.add_participant(content.get('event'))

    return jsonify({"register": True})   

@app.route("/api/create-event", methods=['GET', 'POST'])
def create_event():
    content = request.get_json(force=True)
    print(content)

    Event.create(content.get('name'))

    return jsonify({"create": True})

@app.route("/api/deactivate-event", methods=['PATCH'])
def deactivate_event():
    content = request.get_json(force=True)
    print(content)

    Event.deactivate(content.get('event_id'))

    return jsonify({"deactivate": True})

@app.route("/api/create-company", methods=['POST'])
def create_company():
    content = request.get_json(force=True)

    Company.register(content.get('name'), content.get('password'), content.get('image_link'), content.get('event_id'))
    
    return jsonify({"register": True})

@app.route("/api/send-message", methods=['POST'])
def send_message():
    content = request.get_json(force=True)

    Message.send_message(content.get('content'), content.get('sender_id'), content.get('company_id'))

    return jsonify({"message_sent": True})

@app.route("/api/get-user", methods=['GET'])
def get_user():
    user_id = request.args.get('user_id')

    user = User.find(user_id)

    return jsonify(user.to_dict())

@app.route("/api/update-image", methods=['PATCH'])
def update_image():
    content = request.get_json(force=True)

    Company.change_image(content.get('company_id'), content.get('new_image'))

    return jsonify({"new_image": content.get('new_image')})

@app.route("/api/join-event", methods=['PATCH'])
def join_event():
    content = request.get_json(force=True)

    User.join_event(content.get('user_id'), content.get('event_id'))
    Event.add_visitor(content.get('event_id'))

    return jsonify({"joined_event": Event.find(content.get('event_id')).name})

if __name__ == "__main__":
    app.run()