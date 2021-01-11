from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import json

from model.event import Event
from model.user import User

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Hello there, world!"

@app.route("/events", methods=['GET'])
def events_list():
    all_events = []
    for event in Event.all():
        all_events.append(event)
    return jsonify(all_events)

@app.route("/register", methods=['GET', 'POST'])
def register():
    content = request.get_json(force=True)
    
    print(content)

    if content.get('role') == "visitor":
        User.registerVisitor(content.get('username'), content.get('password'), content.get('role'))
    elif content.get('role') == "participant":
        User.registerParticipant(content.get('username'), content.get('password'), content.get('role'), content.get('event'))

    return content

@app.route("/create-event", methods=['GET', 'POST'])
def createEvent():
    content = request.get_json(force=True)
    print(content)

    Event.create(content.get('name'), 0)

    return content

if __name__ == "__main__":
    app.run()