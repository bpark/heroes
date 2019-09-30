from flask import Flask, escape, request, Response, json
from random import randint
from model import Hero, Mission

app = Flask(__name__)

heroes = [Hero(x, "A" + str(x), randint(10, 100)) for x in range(5)]
missions = [Mission(x, "M" + str(x), randint(40, 100)) for x in range(7)]


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
    # filtered_heroes = [x for x in heroes if x.rid in heroes_ids]
    # [print(str(h)) for h in filtered_heroes]
    mission.start(heroes_ids)
    print(str(mission))
    return json.dumps({"uuid": "123"})


if __name__ == '__main__':
    app.run()
