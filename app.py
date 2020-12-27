from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import json

from model.event import Event
from model.visitor import Visitor

app = Flask(__name__)
CORS(app)

# Event.create('Holy', 15)
# Event.create('Smokes', 33)

@app.route("/")
def home():
    return "Hello there, world!"

@app.route("/events", methods=['GET'])
def events_list():
    all_events = []
    for event in Event.all():
        all_events.append(event)
    return jsonify(all_events)

@app.route("/registration", methods=['GET', 'POST'])
def registration():
    content = request.get_json(force=True)
    
    print(content)

    Visitor.register(content.get('username'), content.get('password'))

    return content

@app.route("/create-event", methods=['GET', 'POST'])
def createEvent():
    content = request.get_json(force=True)
    print(content)

    Event.create(content.get('name'), 0)

    return content

if __name__ == "__main__":
    app.run()