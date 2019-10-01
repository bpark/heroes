from time import strftime, time
from atexit import register

from apscheduler.schedulers.background import BackgroundScheduler
from flask import Flask, escape, request, Response, json
from random import randint
from model import Hero, Mission

app = Flask(__name__)

heroes = [Hero("A" + str(x), randint(10, 100)) for x in range(5)]

duration = randint(30, 60)
expires = time() + randint(30, 60)
missions = [Mission("M" + str(x), randint(40, 100), duration, expires) for x in range(7)]


def schedule_missions():
    print(strftime("%A, %d. %B %Y %I:%M:%S %p"))
    expired_missions = [x for x in missions if x.expires is not None and x.expires <= time()]
    finished_missions = [x for x in missions if x.finish is not None and x.finish <= time()]
    [missions.remove(x) for x in expired_missions]
    new_mission_len = len(expired_missions) + len(finished_missions)
    [missions.append(Mission("M" + str(x), randint(40, 100), duration, expires)) for x in range(new_mission_len)]


scheduler = BackgroundScheduler()
scheduler.add_job(func=schedule_missions, trigger="interval", seconds=15)
scheduler.start()

# Shut down the scheduler when exiting the app
register(lambda: scheduler.shutdown())


@app.route('/')
def hello():
    name = request.args.get("name", "World")
    return f'Hello, {escape(name)}!'


@app.route("/heroes")
def get_heroes():
    serialized = [e.serialize() for e in heroes]
    js = json.dumps(serialized)
    resp = Response(js, status=200, mimetype='application/json')
    return resp


@app.route("/missions")
def get_missions():
    serialized = [e.serialize() for e in missions]
    js = json.dumps(serialized)
    resp = Response(js, status=200, mimetype='application/json')
    return resp


@app.route('/missions/<rid>/heroes', methods=['GET', 'POST'])
def start(rid):
    mission = next(x for x in missions if x.rid == int(rid))
    print(str(mission))
    content = request.json
    heroes_ids = content['heroes']
    print(heroes_ids)
    filtered_heroes = [x for x in heroes if x.rid in heroes_ids]
    [h.set_mission(rid) for h in filtered_heroes]
    mission.start(heroes_ids)
    print(str(mission))
    return json.dumps({"uuid": "123"})


if __name__ == '__main__':
    app.run()
