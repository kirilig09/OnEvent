from flask import Flask, render_template

from event import Event

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello there, world!"

@app.route("/events", methods=["GET"])
def events_list():
    all_events = []
    for event in Event.all_names():
        all_events.append(event)
    return render_template("events_list.html", all_events = all_events)

if __name__ == "__main__":
    app.run()